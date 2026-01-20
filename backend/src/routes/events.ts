import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = Router();

/**
 * GET /api/events
 * Get event logs with filtering and pagination
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status, risk_level, page = 1, limit = 20, start_date, end_date } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase.from('event_logs').select('*, camera_feeds(name, location), algorithms(name)', { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    if (risk_level) {
      query = query.eq('risk_level', risk_level);
    }
    if (start_date) {
      query = query.gte('time', start_date);
    }
    if (end_date) {
      query = query.lte('time', end_date);
    }

    // Apply pagination
    query = query.order('time', { ascending: false }).range(offset, offset + limitNum - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum)
      }
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch events'
    });
  }
});

/**
 * GET /api/events/stats
 * Get event statistics
 */
router.get('/stats', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { start_date, end_date } = req.query;

    let query = supabase.from('event_logs').select('risk_level, status', { count: 'exact' });

    if (start_date) {
      query = query.gte('time', start_date);
    }
    if (end_date) {
      query = query.lte('time', end_date);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    // Calculate statistics
    const stats = {
      total: count || 0,
      byRiskLevel: {
        high: data?.filter(e => e.risk_level === 'high').length || 0,
        medium: data?.filter(e => e.risk_level === 'medium').length || 0,
        low: data?.filter(e => e.risk_level === 'low').length || 0
      },
      byStatus: {
        handled: data?.filter(e => e.status === 'handled').length || 0,
        pending: data?.filter(e => e.status === 'pending').length || 0,
        observing: data?.filter(e => e.status === 'observing').length || 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch event statistics'
    });
  }
});

/**
 * POST /api/events
 * Create new event log (admin/operator)
 */
router.post('/', authenticate, requireRole(['admin', 'operator']), validate(schemas.eventLog), async (req: AuthRequest, res: Response) => {
  try {
    const eventData = req.body;

    const { data, error } = await supabase
      .from('event_logs')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: 'Event created successfully'
    });
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create event'
    });
  }
});

/**
 * PUT /api/events/:id
 * Update event status (admin/operator)
 */
router.put('/:id', authenticate, requireRole(['admin', 'operator']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, description } = req.body;

    const updates: any = {};
    if (status) updates.status = status;
    if (description !== undefined) updates.description = description;

    const { data, error } = await supabase
      .from('event_logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      data,
      message: 'Event updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update event'
    });
  }
});

/**
 * GET /api/events/export
 * Export events as CSV
 */
router.get('/export', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status, risk_level, start_date, end_date } = req.query;

    let query = supabase.from('event_logs').select('*, camera_feeds(name, location), algorithms(name)');

    // Apply filters
    if (status) query = query.eq('status', status);
    if (risk_level) query = query.eq('risk_level', risk_level);
    if (start_date) query = query.gte('time', start_date);
    if (end_date) query = query.lte('time', end_date);

    const { data, error } = await query.order('time', { ascending: false });

    if (error) throw error;

    // Convert to CSV
    const csv = convertToCSV(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=events_${new Date().toISOString()}.csv`);
    res.send(csv);
  } catch (error: any) {
    console.error('Error exporting events:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to export events'
    });
  }
});

// Helper function to convert data to CSV
function convertToCSV(data: any[]): string {
  if (!data || data.length === 0) return '';

  const headers = ['时间', '位置', '类型', '风险等级', '状态', '相机', '算法', '描述'];
  const rows = data.map(event => [
    event.time,
    event.location,
    event.type,
    event.risk_level,
    event.status,
    event.camera_feeds?.name || '',
    event.algorithms?.name || '',
    event.description || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  return csvContent;
}

export default router;
