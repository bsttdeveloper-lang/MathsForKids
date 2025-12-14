import { useState } from "react";
import { Check, X } from "lucide-react";
import { Question, getOperationSymbol } from "@/lib/mathUtils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
  const [inputValue, setInputValue] = useState(question.userAnswer);
  const [hasShake, setHasShake] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    onAnswer(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getInputBorderColor = () => {
    if (!question.isAnswered) return "border-muted";
    return question.isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10";
  };

  return (
    <div className={`
      bg-card rounded-2xl p-5 border-2 border-border shadow-sm
      transition-all duration-200 ${hasShake ? 'animate-shake' : ''}
    `}>
      <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Question {question.id}
      </p>
      
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-foreground">
          {question.num1} {getOperationSymbol(question.operation)} {question.num2} =
        </span>
        
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={question.isAnswered ? question.userAnswer : inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            disabled={question.isAnswered}
            placeholder="?"
            className={`
              w-20 h-14 text-center text-2xl font-bold rounded-xl border-2
              ${getInputBorderColor()}
              bg-muted/50 text-foreground placeholder-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring
              disabled:opacity-100
              transition-colors duration-200
            `}
          />
          
          {question.isAnswered && (
            <div className="animate-pop-in">
              {question.isCorrect ? (
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              ) : (
                <X className="w-8 h-8 text-destructive" strokeWidth={3} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
