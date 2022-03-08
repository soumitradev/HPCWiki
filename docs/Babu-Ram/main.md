HPC Tutorials - Super Advanced 
==================

== Part 0 - Mulit Node Infrastructure ==


- Node = CPU + some (Can be 0 to 8 usually) GPUs connected to it + (System) Memory connected + Storage (per node or entire cluster of nodes)
- Each GPU may be some GPU-cores (Can be 64 to 10,000 usually) and some internal memory (3 GB to 80 GB)
- Each CPU may be some CPU-Cores (Can be 24 to 96 usually)
- System Memory can be 8 GB to 8 TB per node (RAM stored in DDR4/DDR5 etc) 
- Storage can be local (Spread across some SSDs (Usually 256 to 1024 GB each) and Hard Disks (Usually 1 TB to 25 TB each)) or Network Storage (NFS, Lustre, CIFS, GlusterFS... On the LAN)
- Multi Node Cluster = Some Nodes together + Storage for the entire cluster (sometimes)



- Optical Cables (Bandwith > 100 Gb/s) can be passive or active, and have low latency.
- MPI codes that are latency/memory bounded are wasting time waiting for memory transfer and synchronization.
- Inter or Intra node Synchronization always has a latency and CPU overhead, and always happens at CPU.
- For iterative codes that use MPI and multi-nodes, this cost is very high.


Infiniband - 
- Network communications standard (for optical cables in HPC), featuring high throughput and low latency (as compared to standards defined for ethernet based hardware [low throughput] or deep sea cable hardware [high throughput, high latency])
- Infiniband supports RDMA (Remote Direct Memory Access), which allows nodes (in multi node setup) to access memory space (System Memory + Storage) of another node in the network directly, without CPU middleware.



== Part 1 - IAM ==

LDAP - Single-domain/Principle root (One login for everything) centralised (usually) source authentication for all infrastructure.
Authorization (Does this user have the access to this resource) vs AUthentication (Is this the correct user logging in).

Replay attack = Capture packets during handshake (sharing of public keys to each other) and resend it as if you're the sender, thereby giving your public key to the authentication agent and getting the access instead.) [Example : Car signal keys can be re-used]

Solutions :
- Session token being one time use only (intercepted packets can never be quicker than direct packets)
- Introduce a delay to see if multiple users authenticate during the same handshake. If so, restart handshake
- Use secure network
- Embed a second timestamp into packet content (all packets have an external timestamp embedded during the network layer [ethernet hardware], which can be changed, but is incredibly hard to) so that it can be checked against external packet timestamp.
- Time to Live : Packets have an external counter for "How many network hops" before it gets discarded. Protects against agents not in the same network trying to replay attack. 


NTP : Network Time Protocol, updates time from GPS to the machine. Important for Certificate verification, among other things.

Kerberos MIT Protocol for network authentication = Encrypts the transfer of data in an untrusted network, to allow communication with LDAP server securely 

Kerberos - Has the concept of ""