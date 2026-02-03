/**
 * 游戏存储接口
 * 抽象存储层，支持多种云存储实现
 */

// 存储配置
export interface StorageConfig {
  provider: 'qiniu' | 'tencent'
  endpoint: string
  accessKey: string
  secretKey: string
  bucket: string
  region: string
}

// 玩家信息
export interface Player {
  id: string
  name: string
  isHost: boolean
  isReady: boolean
  isOnline: boolean
  lastSeen: number
}

// 房间状态
export interface RoomState {
  id: string
  version: number
  hostId: string
  status: 'waiting' | 'playing' | 'ended'
  players: Player[]
  gameState?: unknown
  createdAt: number
  updatedAt: number
}

// 连接测试结果
export interface ConnectionTestResult {
  success: boolean
  message: string
}

/**
 * 游戏存储接口
 */
export interface IGameStorage {
  /**
   * 获取房间数据
   */
  getRoom(roomId: string): Promise<RoomState | null>

  /**
   * 保存房间数据
   */
  saveRoom(room: RoomState): Promise<boolean>

  /**
   * 删除房间
   */
  deleteRoom(roomId: string): Promise<boolean>

  /**
   * 测试连接
   */
  testConnection(): Promise<ConnectionTestResult>

  /**
   * 获取公开 URL（用于调试）
   */
  getPublicUrl(key: string): string
}

// 存储配置键名
export const STORAGE_CONFIG_KEY = 'wolfcha_storage_config'

// 默认配置（七牛云 - 已预填测试密钥）
export const DEFAULT_STORAGE_CONFIG: StorageConfig = {
  provider: 'qiniu',
  endpoint: 's3.cn-east-1.qiniucs.com',
  accessKey: '21wDcvS0uXaz-qWAcPtC4h4llnNWrvMHUNrUTe_z',
  secretKey: '9RFBV6oK3uPshI4l7JV3N7BwgkTQYWwjbLFqDZJb',
  bucket: '80zle4',
  region: 'cn-east-1',
}

// 预设服务商配置
export const PROVIDER_PRESETS = {
  qiniu: {
    name: '七牛云',
    endpoint: 's3.cn-east-1.qiniucs.com',
    region: 'cn-east-1',
  },
  tencent: {
    name: '腾讯云 COS',
    endpoint: 'cos.ap-shanghai.myqcloud.com',
    region: 'ap-shanghai',
  },
} as const
