import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = Router();

/**
 * GET /api/cameras
 * Get all camera feeds
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;

    let query = supabase.from('camera_feeds').select('*');

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching cameras:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch cameras'
    });
  }
});

/**
 * GET /api/cameras/:id
 * Get single camera by ID
 */
router.get('/:id', authenticate, validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('camera_feeds')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching camera:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch camera'
    });
  }
});

/**
 * POST /api/cameras
 * Create new camera (admin/operator)
 */
router.post('/', authenticate, requireRole(['admin', 'operator']), validate(schemas.cameraFeed), async (req: AuthRequest, res: Response) => {
  try {
    const cameraData = req.body;

    const { data, error } = await supabase
      .from('camera_feeds')
      .insert([cameraData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: 'Camera created successfully'
    });
  } catch (error: any) {
    console.error('Error creating camera:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create camera'
    });
  }
});

/**
 * PUT /api/cameras/:id
 * Update camera (admin/operator)
 */
router.put('/:id', authenticate, requireRole(['admin', 'operator']), validate(schemas.uuidParam, 'params'), validate(schemas.cameraFeed), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('camera_feeds')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    res.json({
      success: true,
      data,
      message: 'Camera updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating camera:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update camera'
    });
  }
});

/**
 * DELETE /api/cameras/:id
 * Delete camera (admin only)
 */
router.delete('/:id', authenticate, requireRole(['admin']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('camera_feeds')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Camera deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting camera:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete camera'
    });
  }
});

/**
 * GET /api/cameras/:id/status
 * Get camera status and health
 */
router.get('/:id/status', authenticate, validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('camera_feeds')
      .select('id, name, status, latency, uptime, last_online')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching camera status:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch camera status'
    });
  }
});

export default router;
