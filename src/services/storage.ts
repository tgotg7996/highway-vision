import { supabase } from '../supabaseClient';

export const uploadEventSnapshot = async (file: File, eventId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `event-snapshots/${eventId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('snapshots')
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('snapshots')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const deleteEventSnapshot = async (filePath: string) => {
  const { error } = await supabase.storage
    .from('snapshots')
    .remove([filePath]);

  if (error) {
    throw new Error(error.message);
  }
};
