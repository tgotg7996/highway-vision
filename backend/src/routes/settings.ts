import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/settings
 * Get all system settings
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.query;

    let query = supabase.from('system_settings').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('key');

    if (error) throw error;

    // Convert to key-value object for easier frontend consumption
    const settings: Record<string, any> = {};
    data?.forEach(setting => {
      settings[setting.key] = {
        value: setting.value,
        category: setting.category,
        description: setting.description,
        updated_at: setting.updated_at
      };
    });

    res.json({
      success: true,
      data: settings
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch settings'
    });
  }
});

/**
 * PUT /api/settings/:key
 * Update a system setting (admin only)
 */
router.put('/:key', authenticate, requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    if (value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Value is required'
      });
    }

    const updates: any = {
      value,
      updated_by: req.user!.id
    };

    if (description !== undefined) {
      updates.description = description;
    }

    // Upsert - update if exists, insert if not
    const { data, error } = await supabase
      .from('system_settings')
      .upsert({ key, ...updates })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: 'Setting updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating setting:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update setting'
    });
  }
});

/**
 * PUT /api/settings/bulk
 * Bulk update settings (admin only)
 */
router.put('/', authenticate, requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const settings = req.body;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid settings object'
      });
    }

    const updates = Object.entries(settings).map(([key, config]: [string, any]) => ({
      key,
      value: config.value,
      category: config.category,
      description: config.description,
      updated_by: req.user!.id
    }));

    const { data, error } = await supabase
      .from('system_settings')
      .upsert(updates)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: 'Settings updated successfully'
    });
  } catch (error: any) {
    console.error('Error bulk updating settings:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update settings'
    });
  }
});

export default router;
