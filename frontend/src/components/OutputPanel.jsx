const OutputPanel = ({ output }) => {
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="bg-base-200 px-4 py-2 border-b border-base-300 font-semibold text-sm">
        Output
      </div>
      <div className="flex-1 overflow-auto p-4">
        {output === null ? (
          <p>Click "Run Code" to se the ouput here...</p>
        ) : output.success ? (
          <p className="text-sm text-success font-mono whitespace-pre-wrap">
            {output.output}
          </p>
        ) : (
          <div>
            {output.output && (
              <pre className="text-sm text-base-content font-mono whitespace-pre-wrap mb-2">
                {output.output}
              </pre>
            )}
            <pre className="text-sm font-mono text-error whitespace-pre-wrap">
              {output.error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
