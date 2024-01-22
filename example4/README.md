# README

This example foregoes drawing images, and just draws shapes and text. It also introduces one of several forms of loops to draw each rectangle in the dashed line down the center.

## A Note on Maintainability

Note that the numbers used in this example are deceptively simple. Try and think about how I came up with these numbers and you'll see it takes some time to figure them out - this is something we want to avoid when writing good code. Many folks think less code is better. While there is definitely truth to that, there's a balance to be had - you never want to reduce code at the cost of maintainability. That is, if people want to understand your code and/or tweak it, how much do they have to read and what should they change? If they need to spend too much time reading your code and/or change more than one thing, you've likely written something poorly. We're all human, so nothing we write will turn out perfect, but these two things are what we aim for. Write code for people first, computers second.

Many developers like to create efficient code for the computer to run as fast as it can - even in non-critical parts of the code. Despite how good this sounds, it isn't a good way to write code by default because efficient code often removes steps that are important for human understanding and it costs time to figure out how to optimize (I actually wrote example 5 first then removed steps). This is a common enough practice that we have a name for it: **Premature optimization**. This goes along with a common saying: "premature optimization is the root of all evil". Of course, we shouldn't take this to mean "don't optimize" - it's just a matter of being selective of which code and when, since it comes with costs.

There are multiple types of optimizations. For example, mutation (changing a value) is an optimization. This means, to avoid premature optimization, We should copy data by default, not change it.