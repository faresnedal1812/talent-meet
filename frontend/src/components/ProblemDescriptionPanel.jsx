import { getDifficultyBadgeClass } from "./../lib/utils";

const ProblemDescriptionPanel = ({ problem, onProblemChange, allProblems }) => {
  return (
    <div className="h-full overflow-auto bg-base-200">
      {/* HEADER */}
      <div className="bg-base-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl text-base-content">
            {problem.title}
          </h2>
          <span
            className={`badge font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-base-content/70 mb-4">{problem.category}</p>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Problems</legend>
          <select
            defaultValue={problem.id}
            className="select w-full"
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === problem.id}>
                {p.title} - {p.difficulty}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      {/* DESCRIPTION */}
      <div className="p-6">
        <div className="bg-base-100 p-5 rounded-xl">
          <h3 className="font-bold text-base-content mb-4">Description</h3>
          <p className="text-sm text-base-content/80 mb-4">
            {problem.description.text}
          </p>
          <div className="space-y-4">
            {problem.description.notes.map((note) => (
              <p className="text-sm text-base-content/80">{note}</p>
            ))}
          </div>
        </div>
      </div>
      {/* EXAMPLES */}
      <div className="px-6 pb-6">
        <div className="bg-base-100 p-5 rounded-xl">
          <h3 className="font-bold text-base-content mb-4">Examples</h3>
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span className="font-semibold">Example {index + 1}</span>
                </div>
                <div className="p-4 bg-base-300 rounded-xl">
                  <div className="flex items-center text-sm gap-6 mb-2 font-medium">
                    <span className="text-primary">Input:</span>
                    <div>{example.input}</div>
                  </div>
                  <div className="flex items-center text-sm gap-6 font-medium mb-5">
                    <span className="text-success">Output:</span>
                    <div>{example.output}</div>
                  </div>
                  <p className="text-base-content/70 text-xs font-medium">
                    Explanation: <span>{example.explanation}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CONSTRAINSTS */}
      <div className="px-6 pb-6">
        <div className="bg-base-100 p-5 rounded-xl">
          <h3 className="font-bold text-base-content mb-4">Constraints</h3>
          <div className="space-y-4">
            {problem.constraints.map((constraint) => (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span className="font-semibold text-xs  text-base-content/70">
                    {constraint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescriptionPanel;
