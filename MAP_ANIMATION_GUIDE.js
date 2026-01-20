// ==================================================================================
// 地图路线动画效果切换指南
// ==================================================================================

/**
 * 在 MainControl.tsx 中，找到这一行代码（约第99行）：
 * className="absolute w-[95%] h-[95%] object-contain mix-blend-screen map-lines-heartbeat"
 * 
 * 替换 map-lines-heartbeat 为以下任一动画类：
 * 
 * 1. map-lines-heartbeat  ← 当前使用 (推荐)
 *    - 效果：心跳式律动，有两次跳动，像心电图
 *    - 速度：2.5秒一个周期
 *    - 特点：缩放 + 发光强度变化
 * 
 * 2. map-lines-ripple
 *    - 效果：水波纹扩散，平滑的呼吸感
 *    - 速度：3秒一个周期
 *    - 特点：仅发光强度变化，无缩放
 * 
 * 3. map-lines-breathing
 *    - 效果：深度呼吸流动，最柔和
 *    - 速度：4秒一个周期
 *    - 特点：亮度 + 发光强度变化
 * 
 * 示例：
 * // 心跳效果（当前）
 * className="... map-lines-heartbeat"
 * 
 * // 水波纹效果
 * className="... map-lines-ripple"
 * 
 * // 呼吸效果
 * className="... map-lines-breathing"
 */

// 如果需要调整动画速度，可以在 styles.css 中修改：
// - heartbeat: animation: heartbeat 2.5s ...   ← 改这个数字
// - ripple: animation: ripple 3s ...          ← 改这个数字  
// - breathing: animation: breathingFlow 4s ... ← 改这个数字

// ==================================================================================
