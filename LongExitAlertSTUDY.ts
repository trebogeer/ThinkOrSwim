# LONGEXITALERT
# WGRIFFITH2 (C) 2014

# This is an alert that stocks is moving outside of normal trading range. Does not necessarily mean that it is a hard exit on either side but it is a signal to monitor much more closely.

input len2 = 21;

# RSI RESISTANCE
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def rsi_high2 = round(HIGHEST(RSI,LENGTH=len2), numberOfDigits = 0);
def Target = RSI == rsi_high2;

# TRAILINGSTOP
def PERIODS = 3;
def STOP = close < Lowest(DATA = low(), LENGTH = PERIODS)[1];

plot EXIT = STOP or TARGET;
EXIT.SetDefaultColor(CreateColor(255, 0, 0));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);