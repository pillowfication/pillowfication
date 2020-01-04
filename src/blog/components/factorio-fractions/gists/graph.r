library(igraph)

nodes <- data.frame(name=c("Input", "A", "B", "C", "D", "O1", "O2"))
edges <- data.frame(from=c("Input", "A", "A", "B", "B", "C", "C", "D", "D"),
                    to  =c(    "A", "C","O1", "C", "D", "B","O2", "A", "O1"))

net <- graph.data.frame(edges, nodes, directed=T)
plot(net)
