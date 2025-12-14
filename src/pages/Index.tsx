import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import OperationCard from "@/components/OperationCard";
import PracticeScreen from "@/components/PracticeScreen";
import StoreButtons from "@/components/StoreButtons";
import { Operation, generateQuestions, Question } from "@/lib/mathUtils";
import { Apple, Play } from "lucide-react";

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [wholeNumbersOnly, setWholeNumbersOnly] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleOperationSelect = (operation: Operation) => {
    const newQuestions = generateQuestions(operation, 10, wholeNumbersOnly);
    setQuestions(newQuestions);
    setSelectedOperation(operation);
  };

  const handleBack = () => {
    setSelectedOperation(null);
    setQuestions([]);
  };

  const handleReset = () => {
    if (selectedOperation) {
      const newQuestions = generateQuestions(selectedOperation, 10, wholeNumbersOnly);
      setQuestions(newQuestions);
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && !q.isAnswered) {
          const userNum = parseFloat(answer);
          const isCorrect = !isNaN(userNum) && Math.abs(userNum - q.correctAnswer) < 0.01;
          return {
            ...q,
            userAnswer: answer,
            isAnswered: true,
            isCorrect,
          };
        }
        return q;
      })
    );
  };

  if (selectedOperation) {
    return (
      <PracticeScreen
        operation={selectedOperation}
        questions={questions}
        onBack={handleBack}
        onReset={handleReset}
        onAnswer={handleAnswer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-nunito mb-2">
            Math Learning App
          </h1>
          <p className="text-lg text-muted-foreground font-nunito">
            Choose an operation to practice
          </p>
        </div>

        {/* Whole Numbers Toggle */}
        <div className="bg-secondary/80 rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Whole numbers only</span>
          <Switch
            checked={wholeNumbersOnly}
            onCheckedChange={setWholeNumbersOnly}
          />
        </div>

        {/* Operation Cards */}
        <div className="space-y-4 mb-10">
          <OperationCard operation="addition" onClick={() => handleOperationSelect("addition")} />
          <OperationCard operation="subtraction" onClick={() => handleOperationSelect("subtraction")} />
          <OperationCard operation="multiplication" onClick={() => handleOperationSelect("multiplication")} />
          <OperationCard operation="division" onClick={() => handleOperationSelect("division")} />
        </div>

        {/* Store Buttons */}
        <div className="pt-4 border-t border-border">
          <p className="text-center text-muted-foreground mb-4 font-nunito">
            Download the full app
          </p>
          <StoreButtons />
        </div>
      </div>
    </div>
  );
};

export default Index;
