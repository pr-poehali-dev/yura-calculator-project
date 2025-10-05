import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const result = calculate(Number(previousValue), Number(display), operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
    }
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '−':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const result = calculate(Number(previousValue), Number(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const ButtonCalc = ({ children, onClick, variant = "outline", className = "" }: any) => (
    <Button
      onClick={onClick}
      variant={variant}
      className={`h-16 text-xl font-medium transition-all hover:scale-105 ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <Card className="w-full max-w-md p-6 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">CALCULATOR</h1>
          {operation && previousValue && (
            <div className="text-sm text-muted-foreground">
              {previousValue} {operation}
            </div>
          )}
        </div>

        <div className="bg-secondary/50 rounded-lg p-6 mb-6 min-h-[80px] flex items-center justify-end">
          <div className="text-5xl font-semibold text-foreground break-all text-right">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <ButtonCalc onClick={handleClear} variant="secondary" className="col-span-2">
            C
          </ButtonCalc>
          <ButtonCalc onClick={handleDelete} variant="secondary">
            <Icon name="Delete" size={20} />
          </ButtonCalc>
          <ButtonCalc onClick={() => handleOperation('÷')} variant="default">
            ÷
          </ButtonCalc>

          <ButtonCalc onClick={() => handleNumber('7')}>7</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('8')}>8</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('9')}>9</ButtonCalc>
          <ButtonCalc onClick={() => handleOperation('×')} variant="default">
            ×
          </ButtonCalc>

          <ButtonCalc onClick={() => handleNumber('4')}>4</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('5')}>5</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('6')}>6</ButtonCalc>
          <ButtonCalc onClick={() => handleOperation('−')} variant="default">
            −
          </ButtonCalc>

          <ButtonCalc onClick={() => handleNumber('1')}>1</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('2')}>2</ButtonCalc>
          <ButtonCalc onClick={() => handleNumber('3')}>3</ButtonCalc>
          <ButtonCalc onClick={() => handleOperation('+')} variant="default">
            +
          </ButtonCalc>

          <ButtonCalc onClick={() => handleNumber('0')} className="col-span-2">
            0
          </ButtonCalc>
          <ButtonCalc onClick={handleDecimal}>.</ButtonCalc>
          <ButtonCalc onClick={handleEquals} variant="default" className="bg-primary hover:bg-primary/90">
            =
          </ButtonCalc>
        </div>
      </Card>
    </div>
  );
};

export default Index;
