# Data structures and algorithms (Python, data-science depth)

Interviews for DS/MLE roles still ask for this. Production work asks for it whenever a naive loop meets a million rows.

## Complexity

Big-O is the growth of time/memory as `n` grows. You need:

- O(1) dict/set average lookup (hashing)
- O(n) scans
- O(n log n) sorts
- O(n²) as a smell on large n

Hash maps turn “for each user, scan all events” into “groupby in linear time.” That is the whole subject in one sentence.

## Patterns that show up

**Frequency counting.** `Counter` or a dict. Top-k: heap (`heapq.nlargest`) or sort. Exercise: `top_k_frequent`.

**Two pointers / sliding window.** Moving average, longest span with a budget, two-sum on a sorted array. Exercise: `moving_average`.

**Stack.** Matching parentheses, monotonic stack for “next greater.”

**Trees / recursion.** File trees, model trees, JSON. Know DFS vs BFS. You rarely implement a red-black tree.

**Graphs.** Users–products as bipartite graphs. BFS for shortest unweighted path. Data scientists meet this in recommendations and fraud.

## Arrays vs lists vs dicts

Python lists are dynamic arrays of pointers. NumPy arrays are packed data. Never store a million floats in a list if you will do math.

Dict keys must be hashable (immutable). Using a list as a key fails; a tuple works.

## Interview tactic

1. Restate, including scale (`n` up to ?).
2. Brute force first, say its complexity.
3. Find the repeated subproblem → hash or sort or two pointers.
4. Code cleanly, then tests: empty, one element, duplicates.

## You should be able to

- Give complexities for list index, dict get, sort.
- Implement frequency top-k and a sliding window mean.
- Detect O(n²) pandas `iterrows` and replace it.

Next: [SQL](03-sql.md).
