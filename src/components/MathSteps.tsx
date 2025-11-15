interface MathStepsProps {
  content: string;
}

function MathSteps({ content }: MathStepsProps) {
  const lines = content.split('\n');
  const hasSteps = content.includes('Step') || content.includes('step');

  if (!hasSteps) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const isStep = /^(Step|\d+\.|\*\*Step)/i.test(line.trim());
        const isFinal = /^(Final|Answer|Result)/i.test(line.trim());

        if (isStep) {
          return (
            <div key={index} className="font-semibold text-blue-800 bg-blue-50 px-3 py-2 rounded">
              {line}
            </div>
          );
        }

        if (isFinal) {
          return (
            <div key={index} className="font-bold text-green-800 bg-green-50 px-3 py-2 rounded border-l-4 border-green-500">
              {line}
            </div>
          );
        }

        return line.trim() ? (
          <div key={index} className="pl-4">{line}</div>
        ) : (
          <div key={index} className="h-2" />
        );
      })}
    </div>
  );
}

export default MathSteps;
