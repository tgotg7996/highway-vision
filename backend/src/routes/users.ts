import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = Router();

/**
 * GET /api/users
 * Get all users (admin only)
 */
router.get('/', authenticate, requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch users'
    });
  }
});

/**
 * GET /api/users/me
 * Get current user profile
 */
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', req.user!.id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch user profile'
    });
  }
});

/**
 * PUT /api/users/:id
 * Update user profile (admin or self)
 */
router.put('/:id', authenticate, validate(schemas.uuidParam, 'params'), validate(schemas.userProfile), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if user is admin or updating their own profile
    const isAdmin = req.user!.role === 'admin';
    const isSelf = req.user!.id === id;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }

    // Non-admins cannot change role or status
    if (!isAdmin) {
      delete updates.role;
      delete updates.status;
      delete updates.permissions;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: 'User profile updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update user'
    });
  }
});

/**
 * PATCH /api/users/:id/permissions
 * Update user permissions (admin only)
 */
router.patch('/:id/permissions', authenticate, requireRole(['admin']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    if (!Array.isArray(permissions)) {
      return res.status(400).json({
        success: false,
        error: 'Permissions must be an array'
      });
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({ permissions })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: 'User permissions updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating permissions:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update permissions'
    });
  }
});

/**
 * DELETE /api/users/:id
 * Delete user (admin only)
 */
router.delete('/:id', authenticate, requireRole(['admin']), validate(schemas.uuidParam, 'params'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (id === req.user!.id) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }

    // Delete from auth.users (will cascade to user_profiles)
    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete user'
    });
  }
});

export default router;
