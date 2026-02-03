import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Support both standard anon key and publishable key naming
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Supabase 是可选的，仅在配置了环境变量时才启用
// 使用占位符 URL 和 key 创建一个 dummy 客户端，避免 TypeScript null 检查问题
// 实际调用时会失败，但不会阻止构建
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key";

export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseAnonKey || PLACEHOLDER_KEY
);

// 检查 Supabase 是否真正配置
export function isSupabaseEnabled(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
