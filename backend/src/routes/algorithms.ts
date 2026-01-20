import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import { Algorithm } from '../types/index.js';

const router = Router();

/**
 * GET /api/algorithms
 * Get all algorithms
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching algorithms:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch algorithms'
    });
  }
});

/**
 * GET /api/algorithms/:id
 * Get single algorithm by ID
 */
router.get('/:id', authenticate, validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Algorithm not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching algorithm:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch algorithm'
    });
  }
});

/**
 * POST /api/algorithms
 * Create new algorithm (admin only)
 */
router.post('/', authenticate, requireRole(['admin']), validate(schemas.algorithm), async (req: AuthRequest, res: Response) => {
  try {
    const algorithmData: Partial<Algorithm> = req.body;

    const { data, error } = await supabase
      .from('algorithms')
      .insert([algorithmData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: 'Algorithm created successfully'
    });
  } catch (error: any) {
    console.error('Error creating algorithm:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create algorithm'
    });
  }
});

/**
 * PUT /api/algorithms/:id
 * Update algorithm (admin only)
 */
router.put('/:id', authenticate, requireRole(['admin']), validate(schemas.uuidParam, 'params'), validate(schemas.algorithm), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('algorithms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Algorithm not found'
      });
    }

    res.json({
      success: true,
      data,
      message: 'Algorithm updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating algorithm:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update algorithm'
    });
  }
});

/**
 * DELETE /api/algorithms/:id
 * Delete algorithm (admin only)
 */
router.delete('/:id', authenticate, requireRole(['admin']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('algorithms')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Algorithm deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting algorithm:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete algorithm'
    });
  }
});

/**
 * PATCH /api/algorithms/:id/toggle
 * Toggle algorithm status (admin/operator)
 */
router.patch('/:id/toggle', authenticate, requireRole(['admin', 'operator']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // First, get current status
    const { data: current, error: fetchError } = await supabase
      .from('algorithms')
      .select('status')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (!current) {
      return res.status(404).json({
        success: false,
        error: 'Algorithm not found'
      });
    }

    // Toggle status
    const newStatus = current.status === 'online' ? 'offline' : 'online';

    const { data, error } = await supabase
      .from('algorithms')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: `Algorithm ${newStatus === 'online' ? 'enabled' : 'disabled'} successfully`
    });
  } catch (error: any) {
    console.error('Error toggling algorithm:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to toggle algorithm'
    });
  }
});

export default router;
