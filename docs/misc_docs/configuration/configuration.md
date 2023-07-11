---
sidebar_position: 2
sidebar_label: "Configuration"
hide_table_of_contents: true
hide_title: true
pagination_next: null
pagination_prev: null
title: "Configuration"
---

## Configuration

<div className="content-center">

<p className="center">
Some of the specifications of the nodes are listed below.
</p>

| Nodes              | Description                                                              | Interconnect |
| ------------------ | ------------------------------------------------------------------------ | ------------ |
| login[1-2]         | 16x2 cores AMD EPYC 7282, and 256 GB of memory.                          | EDR          |
| compute[1-22]      | 32x2 cores AMD EPYC 7542, and 256 GB of memory.                          | EDR          |
| big_compute[23-25] | 96x2 cores AMD EPYC 9654, and 396 GB of memory.                          | HDR          |
| gpu1               | 32x2 cores AMD EPYC 7542, 256 GB of memory, and 1x Tesla V100 PCIe 32GB. | EDR          |
| gpu[2-3]           | 32x2 cores AMD EPYC 7542, 256 GB of memory, and 2x Tesla V100 PCIe 32GB. | EDR          |
| gpu4               | 32x2 cores AMD EPYC 7532, 1 TB of memory, and 8x A100 SXM4 80GB.         | HDR          |

</div>
