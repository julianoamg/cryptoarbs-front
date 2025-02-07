export interface RobotConfig {
    id?: string;
    name: string;
    enabled: boolean;
    exchanges: string[];
    pairs: string[];
    minSpread: number;
    maxSpread: number;
    minVolume: number;
    maxVolume: number;
    minProfit: number;
    maxLoss: number;
    stopLoss: number;
    takeProfit: number;
    trailingStop: boolean;
    trailingStopDistance: number;
    timeframe: string;
    strategy: string;
    riskManagement: RiskManagement;
}

export interface RiskManagement {
    maxPositions: number;
    maxDailyTrades: number;
    maxDailyLoss: number;
    maxDrawdown: number;
    positionSize: number;
    leverageLevel: number;
}

export interface Exchange {
    id: string;
    name: string;
    enabled: boolean;
    apiKey: string;
    apiSecret: string;
    testnet: boolean;
}

export interface TradingPair {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    minQty: number;
    maxQty: number;
    stepSize: number;
    minNotional: number;
    status: string;
}

export interface Strategy {
    id: string;
    name: string;
    description: string;
    parameters: Record<string, any>;
}

export interface Position {
    id: string;
    symbol: string;
    side: 'LONG' | 'SHORT';
    entryPrice: number;
    currentPrice: number;
    quantity: number;
    leverage: number;
    unrealizedPnl: number;
    realizedPnl: number;
    status: 'OPEN' | 'CLOSED';
    openTime: Date;
    closeTime?: Date;
} 