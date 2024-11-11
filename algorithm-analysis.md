# Comparing Different Algorithm Analysis Types

In my CS6150 Advanced Algorithms class, I'm learning about different kinds of algorithm analysis.

I tried to understand how they all fit together.  Here's the result.

## Similarities between all 3:
- Approximate Analysis — compares how close the approximate algorithm gets to optimal (approximation ratio)
- Competitive Analysis — compares how close an online algorithm gets to the offline algorithm (competitve ratio)
- Amortized Analysis — compares the worst-case complexity of an algorithm to the average complexity.

## Similarities between Competitive and Amortized:
Both Competitive and Amortized deal with sequences of steps: Competitive because it doesn’t know the future and so it can only deal with one step at a time (such as a page request in memory paging); and Amortized because it analyzes the complexity of each step in an algorithm to determine the overall, or amortized, complexity.

## How they fit together:
- Is the optimal algorithm tractable (can it run in a reasonable time on a real computer / is it in P rather than NP)?
    - If not, then use approximation analysis to compare your approximate but realistic algorithm to the optimal.  The approximation ratio compares the quality of the worst-case approximate answer to the optimal algorithm’s answer.  Here, we also compare efficiency, ie the computational complexity of the optimal algorithm (usually in NP) to that of the approximate algorithm (certainly in P).
- You have a tractable algorithm (in P).
    - Is it online?  If yes, then use competitive analysis to compare its answer to that of the offline.  The competitive ratio compares the quality of the online algorithm’s answer to the quality of the offline algorithm.  We don’t usually worry about computational complexity here, because the fact that it’s online implies it’s a practical algorithm that we can use to solve real-world problems; in other words, it’s already an efficient algorithm.
    - It’s offline?  You might use amortized analysis to see whether the complexity is actually better than the worst-case complexity might suggest.  

### Diagram
![a flowchart showing when you'd use the different analysis types](analysis.png "Algorithm Analysis Flowcharts")
