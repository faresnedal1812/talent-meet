import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/examples";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Link } from "react-router";
import { useState } from "react";

const ProblemsPage = () => {
  const problems = Object.values(PROBLEMS);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedProblems = problems.slice(startIndex, endIndex);

  const easyProblemsCount = problems.filter(
    (problem) => problem.difficulty.toLowerCase() === "easy",
  ).length;

  const mediumProblemsCount = problems.filter(
    (problem) => problem.difficulty.toLowerCase() === "medium",
  ).length;

  const hardProblemsCount = problems.filter(
    (problem) => problem.difficulty.toLowerCase() === "hard",
  ).length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black mb-1">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>
        {/* PROBLEM LIST */}

        {/* Using key={currentPage} forces React to redraw the element → and the animation starts again. */}
        <div className="space-y-8 mt-12 animate-fade-slide" key={currentPage}>
          {paginatedProblems.map((problem) => (
            <Link
              to={`/problems/${problem.id}`}
              key={problem.id}
              className="card bg-base-100 hover:scale-[1.01] transition-transform duration-300 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold">
                            {problem.title}
                          </span>
                          <span
                            className={`badge badge-md font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-base-content/70">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-base-content/90 mt-2">
                      {problem.description.text}
                    </p>
                  </div>

                  <div className="text-primary font-medium flex items-center ml-12">
                    Solve
                    <ChevronRightIcon className="size-4 mt-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-10">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="stats stats-vertical sm:stats-horizontal">
              {/* STAT 1 */}
              <div className="stat text-center">
                <span className="stat-title text-base-content/80">
                  Total Problems
                </span>
                <span className="stat-value text-primary">
                  {problems.length}
                </span>
              </div>
              {/* STAT 2 */}
              <div className="stat text-center">
                <span className="stat-title text-base-content/80">Easy</span>
                <span className="stat-value text-success">
                  {easyProblemsCount}
                </span>
              </div>
              {/* STAT 3 */}
              <div className="stat text-center">
                <span className="stat-title text-base-content/80">Medium</span>
                <span className="stat-value text-warning">
                  {mediumProblemsCount}
                </span>
              </div>
              {/* STAT 4 */}
              <div className="stat text-center">
                <span className="stat-title text-base-content/80">Hard</span>
                <span className="stat-value text-error">
                  {hardProblemsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
