import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "./../data/examples";

const CreateSessionModal = ({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) => {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h2 className="font-bold text-2xl mb-6">Create New Session</h2>
        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <div className="label text-sm">
              <span>Select Problem</span>
              <span className="text-error">*</span>
            </div>
            <select
              className="select w-full"
              defaultValue={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value,
                );
                setRoomConfig({
                  problem: e.target.value,
                  difficulty: selectedProblem.difficulty,
                });
              }}
            >
              <option value={""} disabled>
                Choose a coding problem...
              </option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>
          {/* PROBLEM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary gap-2"
            disabled={isCreating || !roomConfig.problem}
            onClick={onCreateRoom}
          >
            {isCreating ? (
              <>
                <LoaderIcon className="size-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusIcon className="size-5" />
                Create
              </>
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default CreateSessionModal;
