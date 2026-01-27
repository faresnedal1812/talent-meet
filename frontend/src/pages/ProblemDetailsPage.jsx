import Navbar from "../components/Navbar";
import { Group, Panel, Separator } from "react-resizable-panels";
import ProblemDescriptionPanel from "./../components/ProblemDescriptionPanel";
import CodeEditorPanel from "./../components/CodeEditorPanel";
import OutputPanel from "./../components/OutputPanel";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "./../data/examples";
import { useState } from "react";
import { executeCode } from "../lib/piston";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const ProblemDetailsPage = () => {
  const { id: problemId } = useParams();
  const navigate = useNavigate();

  const currentProblemId =
    problemId && PROBLEMS[problemId] ? problemId : "two-sum";
  const currentProblem = PROBLEMS[currentProblemId];

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    currentProblem.starterCode[selectedLanguage],
  );
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleProblemChange = (newProblemId) =>
    navigate(`/problems/${newProblemId}`);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizeActual = normalizeOutput(actualOutput);
    const normalizeExpected = normalizeOutput(expectedOutput);

    return normalizeActual === normalizeExpected;
  };
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        triggerConfetti();
        toast.success("All test passed! Great job!");
      } else {
        toast.error("Tests failed. check your output");
      }
    } else {
      toast.error("Code execution failed");
    }
  };

  return (
    <div className="bg-base-100 h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Group orientation="horizontal">
          <Panel defaultSize={"40%"} minSize={"30%"}>
            <ProblemDescriptionPanel
              problem={currentProblem}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>
          <Separator className="w-0.5 bg-base-300 hover:bg-primary/20 transition-colors duration-100 cursor-row-resize" />
          <Panel defaultSize={"60%"} minSize={"30%"}>
            <Group orientation="vertical">
              <Panel defaultSize={"70%"} minSize={"30%"}>
                <CodeEditorPanel
                  code={code}
                  selectedLanguage={selectedLanguage}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>
              <Separator className="h-0.5 bg-base-300 hover:bg-primary/20 transition-colors duration-100 cursor-col-resize" />
              <Panel defaultSize={"30%"} minSize={"30%"}>
                <OutputPanel output={output} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
};

export default ProblemDetailsPage;
