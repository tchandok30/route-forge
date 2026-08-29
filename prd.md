# RouteForge — Product Requirements Document

**Product:** RouteForge
**Tagline:** *Optimize. Dispatch. Re-optimize.*
**Category:** Logistics Optimization / Fleet Operations
**Type:** Full-stack optimization platform
**Target:** Portfolio → Hackathon → Potential SaaS/startup

---

# 1. Vision

RouteForge is a **dynamic logistics optimization platform** that helps delivery businesses decide:

> **Which orders should go in which vehicle, which driver should take them, and in what sequence should they be delivered — while continuously adapting when conditions change.**

The core product is **not fleet management**.

The core product is:

> **Optimization under real-world constraints.**

---

# 2. Problem

A dispatcher managing a fleet has to simultaneously consider:

* Vehicle capacity
* Package weight
* Package volume
* Delivery locations
* Delivery deadlines
* Order priority
* Driver availability
* Driver working hours
* Vehicle availability
* Route distance
* Fuel/operating cost
* Delays
* Vehicle breakdowns
* New urgent orders
* Cancelled orders

Manual planning becomes difficult as the number of orders increases.

### Example

```text
50 orders
10 vehicles
8 drivers
20 constraints
```

A human dispatcher may produce a workable solution.

But is it the **best** solution?

RouteForge attempts to find a better one algorithmically.

---

# 3. Product Goal

Given:

```text
Orders
+
Vehicles
+
Drivers
+
Locations
+
Constraints
```

generate:

```text
Vehicle assignments
+
Load assignments
+
Driver assignments
+
Delivery sequence
+
ETA
+
Cost
```

while minimizing:

```text
Distance
+
Cost
+
Late deliveries
+
Unused capacity
+
Driver overtime
+
Vehicles used
```

---

# 4. Target Users

### 4.1 Dispatcher

Primary user.

Uses RouteForge to:

* create/manage orders
* manage fleet
* run optimization
* monitor active routes
* respond to disruptions

### 4.2 Fleet Manager

Uses:

* fleet analytics
* cost analysis
* utilization metrics
* optimization reports

### 4.3 Driver

Uses:

* assigned route
* delivery sequence
* order details
* navigation
* delivery status

### 4.4 Administrator

Manages:

* users
* permissions
* fleet configuration
* system settings

---

# 5. Core Product Loop

```text
              ORDERS
                 ↓
        ┌─────────────────┐
        │     ROUTEFORGE  │
        │ Optimization    │
        │     Engine      │
        └─────────────────┘
                 ↓
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    Loading    Routing   Drivers
       ↓         ↓         ↓
       └─────────┼─────────┘
                 ↓
           BEST FEASIBLE PLAN
                 ↓
            LIVE EXECUTION
                 ↓
             DISRUPTION
                 ↓
          RE-OPTIMIZATION
```

This **closed-loop system** is the main differentiator.

---

# 6. Functional Requirements

## 6.1 Authentication

Users can:

* Register
* Login
* Logout
* Reset password
* Update profile

Authentication:

**JWT + HTTP-only cookies**

---

# 7. Role-Based Access Control

Roles:

```text
ADMIN
MANAGER
DISPATCHER
DRIVER
```

### Admin

Full access.

### Manager

Fleet + analytics + optimization.

### Dispatcher

Orders + fleet + optimization + routes.

### Driver

Only assigned deliveries/routes.

---

# 8. Order Management

Dispatcher can:

* create order
* edit order
* cancel order
* assign priority
* set deadline
* track status
* view order history

### Order fields

```text
Order ID
Customer Name
Customer Contact
Pickup Location
Delivery Location
Weight
Volume
Package Count
Priority
Delivery Window
Deadline
Service Time
Special Requirements
Status
Created At
Updated At
```

---

# 9. Order Priority

```text
LOW
NORMAL
HIGH
CRITICAL
```

Priority affects optimization.

Example:

```text
CRITICAL
    ↓
Very high lateness penalty

HIGH
    ↓
High penalty

NORMAL
    ↓
Normal penalty

LOW
    ↓
Low penalty
```

---

# 10. Order Lifecycle

```text
PENDING
   ↓
ASSIGNED
   ↓
LOADED
   ↓
IN_TRANSIT
   ↓
DELIVERED
```

Alternative:

```text
FAILED
CANCELLED
```

Every transition is recorded.

---

# 11. Vehicle Management

Each vehicle contains:

```text
Vehicle ID
Registration Number
Type
Maximum Weight
Maximum Volume
Fuel Type
Fuel Efficiency
Current Location
Status
Availability Window
Maintenance Status
```

### Vehicle types

```text
BIKE
VAN
MINI_TRUCK
TRUCK
REFRIGERATED_TRUCK
```

---

# 12. Vehicle Constraints

Example:

```text
Maximum weight = 1000 kg
Maximum volume = 20 m³
```

The optimization engine cannot produce:

```text
Load = 1100 kg
```

because it violates a hard constraint.

---

# 13. Driver Management

Driver fields:

```text
Driver ID
Name
Phone
License Type
Working Hours
Current Location
Status
Assigned Vehicle
Maximum Working Hours
```

### Driver status

```text
AVAILABLE
ASSIGNED
ON_DELIVERY
OFF_DUTY
UNAVAILABLE
```

---

# 14. Driver Assignment

Driver assignment should consider:

```text
Availability
Working hours
License requirements
Vehicle compatibility
Current workload
Current location
```

Example:

```text
Heavy Truck
      ↓
Find drivers with required license
      ↓
Filter available drivers
      ↓
Calculate workload
      ↓
Choose best candidate
```

---

# 15. Optimization Engine

This is the **core component**.

Input:

```text
Orders
Vehicles
Drivers
Locations
Distance Matrix
Constraints
Optimization Weights
```

Output:

```text
Vehicle assignments
Driver assignments
Order assignments
Delivery sequences
ETAs
Distance
Cost
Capacity utilization
Late deliveries
```

---

# 16. Hard Constraints

These cannot be violated.

Examples:

```text
Vehicle weight capacity
Vehicle volume capacity
Driver availability
Driver working hours
Vehicle availability
Required license
Required vehicle type
Maximum route duration
```

---

# 17. Soft Constraints

The algorithm tries to minimize:

```text
Travel distance
Fuel cost
Unused capacity
Driver workload imbalance
Number of vehicles
Overtime
Late delivery
```

---

# 18. Optimization Objective

Conceptually:

```text
Total Score =

W1 × Distance
+
W2 × Cost
+
W3 × Late Delivery Penalty
+
W4 × Capacity Waste
+
W5 × Overtime
+
W6 × Vehicle Usage
```

Lower score = better plan.

Weights should be configurable.

---

# 19. Load Optimization

Example:

```text
Vehicle capacity = 1000 kg

Orders:

A = 300 kg
B = 250 kg
C = 450 kg
D = 100 kg
E = 400 kg
```

Possible solution:

```text
Vehicle 1
A + C + D
= 850 kg

Vehicle 2
B + E
= 650 kg
```

Instead of using 5 vehicles.

### Initial algorithm

Implement:

**Best Fit Decreasing**

Then experiment with:

* First Fit Decreasing
* Greedy
* Local Search

---

# 20. Route Optimization

After assigning orders to vehicles:

```text
Warehouse
    ↓
A
    ↓
B
    ↓
C
    ↓
Warehouse
```

RouteForge optimizes the sequence.

### Version 1

Nearest Neighbor.

### Version 2

2-opt.

### Version 3

Local Search.

### Advanced

OR-Tools / advanced VRP solver.

---

# 21. Distance Matrix

For each location:

```text
A → B
A → C
A → D
B → C
...
```

Initially:

Use simulated coordinates / Haversine distance.

Later:

Use a mapping/routing API.

---

# 22. ETA

ETA should consider:

```text
Travel time
+
Service time
+
Previous stops
+
Delay
```

Example:

```text
Order A
ETA: 10:32 AM

Order B
ETA: 11:04 AM

Order C
ETA: 11:48 AM
```

---

# 23. Cost Engine

Estimated cost:

```text
Fuel Cost
+
Driver Cost
+
Vehicle Operating Cost
+
Overtime
+
Late Penalty
```

Example:

```text
Fuel              ₹4,200
Driver            ₹3,500
Vehicle           ₹2,100
Late Penalty        ₹800
------------------------
Total             ₹10,600
```

---

# 24. Optimization Result

After running optimization:

```text
BEFORE

Vehicles:          8
Distance:       1240 km
Cost:          ₹18,400
Late orders:        8
Utilization:       61%
```

After:

```text
AFTER

Vehicles:          6
Distance:        980 km
Cost:          ₹14,700
Late orders:        2
Utilization:       84%
```

Display:

```text
Vehicles saved: 2
Distance saved: 260 km
Cost saved: ₹3,700
```

---

# 25. Optimization Run History

Every optimization should be stored.

Example:

```text
Run #102

Created:
27 Aug 2026, 4:32 PM

Orders:
127

Vehicles:
21

Algorithm:
Hybrid Greedy + 2-opt

Result:
16 vehicles

Cost:
₹29,700

Distance:
1,930 km

Late deliveries:
4
```

This allows algorithm comparison later.

---

# 26. Dynamic Re-optimization

This is the **most important advanced feature**.

The system should react to:

### Vehicle breakdown

```text
V07 BROKEN DOWN
```

### Driver unavailable

```text
Driver D04 OFFLINE
```

### Traffic delay

```text
V03 +32 minutes
```

### New urgent order

```text
CRITICAL ORDER RECEIVED
```

### Order cancellation

```text
ORDER #1042 CANCELLED
```

Then:

```text
EVENT
 ↓
Identify affected routes
 ↓
Recalculate constraints
 ↓
Run optimization
 ↓
Generate new plan
 ↓
Notify users
```

---

# 27. Partial Re-optimization

Do **not** recompute the entire fleet every time.

If:

```text
V07 breaks down
```

first identify:

```text
Orders affected by V07
```

Then optimize the **affected subset**.

This makes the system faster.

Later, you can compare:

```text
Full Optimization
vs
Partial Optimization
```

This itself becomes a technical optimization feature.

---

# 28. What-If Simulation

Dispatcher can test hypothetical situations without changing the actual plan.

Examples:

```text
What if V03 breaks down?

What if we add one vehicle?

What if fuel prices increase 10%?

What if order #1024 becomes CRITICAL?

What if driver D07 becomes unavailable?
```

The system creates a simulation.

### Example

```text
CURRENT

Cost: ₹14,700
Late: 2


V03 BREAKDOWN

Cost: ₹18,200
Late: 9


ADD TEMPORARY VEHICLE

Cost: ₹15,400
Late: 3
```

Dispatcher chooses the best option.

---

# 29. Live Fleet Tracking

Map displays:

```text
Vehicle
Driver
Current location
Route
Delivery stops
Status
```

Vehicle statuses:

```text
🟢 ON_TIME
🟡 DELAYED
🔴 CRITICAL
⚫ OFFLINE
```

---

# 30. Driver Dashboard

Driver sees:

```text
Today's Route

1. Customer A ✓
2. Customer B ✓
3. Customer C →
4. Customer D
5. Customer E
```

Each stop:

```text
Customer
Address
Package
Weight
Priority
ETA
Contact
```

Driver can:

```text
Start delivery
Arrive
Mark delivered
Report issue
```

---

# 31. Real-Time Updates

Use Socket.IO.

Events:

```text
vehicle:location_updated
vehicle:delayed
vehicle:breakdown

order:created
order:assigned
order:delivered
order:cancelled

route:updated

optimization:started
optimization:completed
```

---

# 32. Notifications

Dispatcher:

> ⚠️ Vehicle V07 has broken down.

Driver:

> 🔄 Your route has been updated.

Manager:

> 📊 Today's fleet optimization saved an estimated ₹3,700.

Customer:

> 🚚 Your delivery ETA has changed to 4:40 PM.

---

# 33. Dashboard

Main dashboard:

```text
┌──────────────────────────────────────────────┐
│ ROUTEFORGE                                   │
├──────────────────────────────────────────────┤
│                                              │
│ Orders     Vehicles     Drivers     Active   │
│ 127        18           16          12       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│                LIVE MAP                      │
│                                              │
│       🚚────────●────●                      │
│          ╲                                 │
│           ●────●                           │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ Cost       Distance     Utilization   Late   │
│ ₹14.7K     980 km        84%          2     │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 34. Optimization Dashboard

Show:

```text
Current Fleet
Orders
Constraints
Algorithm
Optimization weights
```

Button:

> **RUN OPTIMIZATION**

Then:

```text
Analyzing orders...
Checking capacities...
Assigning vehicles...
Optimizing routes...
Assigning drivers...
Checking deadlines...
```

Finally:

```text
Optimization complete.
```

---

# 35. Map Interface

Map should display:

* Warehouse
* Customers
* Vehicles
* Routes
* Delayed vehicles
* Completed stops

Click vehicle:

```text
V07

Driver:
Ravi

Load:
820 / 1000 kg

Utilization:
82%

Stops:
7

ETA:
4:42 PM

Status:
DELAYED
```

---

# 36. Analytics

### Fleet Analytics

```text
Vehicle utilization
Distance/vehicle
Cost/vehicle
Fuel efficiency
```

### Delivery Analytics

```text
On-time %
Late %
Average delivery time
Failed deliveries
```

### Optimization Analytics

```text
Vehicles saved
Distance saved
Cost saved
Capacity improvement
```

---

# 37. Algorithm Comparison

A strong advanced feature.

Run the same dataset through:

```text
Greedy
Nearest Neighbor
2-opt
Hybrid Algorithm
OR-Tools
```

Display:

```text
Algorithm          Distance     Cost

Greedy             1482 km      ₹22,400

Nearest Neighbor   1301 km      ₹20,100

2-opt              1187 km      ₹18,900

Hybrid             1143 km      ₹18,100
```

This gives you a measurable reason for your algorithm choices.

---

# 38. Database

Use PostgreSQL.

### Core tables

```text
users
drivers
vehicles
orders
routes
route_stops
assignments
optimization_runs
optimization_results
vehicle_locations
delivery_events
notifications
audit_logs
```

---

# 39. Backend Architecture

```text
                    React
                      │
                REST / WebSocket
                      │
                      ▼
               Node + Express
                      │
       ┌──────────────┼───────────────┐
       ↓              ↓               ↓
 PostgreSQL         Redis          Socket.IO
       │              │               │
       │              ↓               │
       │           BullMQ             │
       │              │               │
       │              ▼               │
       │      Optimization Worker     │
       │              │               │
       │              ▼               │
       │       Optimization Engine    │
       └──────────────┴───────────────┘
```

---

# 40. Why Redis?

Use Redis for:

* live vehicle state
* caching distance matrices
* active route state
* optimization job state
* pub/sub
* temporary data

---

# 41. Why BullMQ?

Optimization can be computationally expensive.

Instead of:

```text
POST /optimize
       ↓
API waits 30 seconds
```

use:

```text
POST /optimize
       ↓
Create job
       ↓
BullMQ
       ↓
Worker
       ↓
Optimization
       ↓
Save result
       ↓
Notify frontend
```

---

# 42. Optimization Service

For advanced optimization:

```text
Node Backend
      ↓
Optimization Service
      ↓
Python
      ↓
OR-Tools / Custom Algorithms
```

However, **start with your own algorithms first**.

Don't blindly use OR-Tools and call that your optimization.

---

# 43. API Design

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Orders

```text
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id
DELETE /api/orders/:id
```

### Vehicles

```text
GET    /api/vehicles
POST   /api/vehicles
PATCH  /api/vehicles/:id
DELETE /api/vehicles/:id
```

### Drivers

```text
GET    /api/drivers
POST   /api/drivers
PATCH  /api/drivers/:id
```

### Optimization

```text
POST /api/optimization/run
GET  /api/optimization/:id
GET  /api/optimization/history
```

### Simulation

```text
POST /api/simulation/run
GET  /api/simulation/:id
```

### Analytics

```text
GET /api/analytics/fleet
GET /api/analytics/delivery
GET /api/analytics/optimization
```

---

# 44. Frontend Pages

```text
/login

/dashboard

/orders
/orders/:id

/vehicles
/vehicles/:id

/drivers
/drivers/:id

/routes
/routes/:id

/optimization

/simulation

/analytics

/settings
```

Driver:

```text
/driver/dashboard
/driver/route
/driver/delivery/:id
```

---

# 45. Tech Stack

## Frontend

```text
React
TypeScript
Tailwind CSS
React Router
TanStack Query
Recharts
Leaflet
```

## Backend

```text
Node.js
Express
TypeScript
JWT
Zod
```

## Database

```text
PostgreSQL
Prisma
```

## Infrastructure

```text
Redis
BullMQ
Socket.IO
Docker
```

## Optimization

```text
Custom heuristics
Python
OR-Tools
```

---

# 46. MVP

Do **not** build the whole PRD initially.

MVP:

```text
✓ Authentication
✓ Orders
✓ Vehicles
✓ Drivers
✓ PostgreSQL
✓ Basic vehicle assignment
✓ Bin packing
✓ Basic routing
✓ Cost calculation
✓ Optimization API
✓ Dashboard
✓ Map
```

---

# 47. V2

```text
✓ Driver dashboard
✓ Real-time tracking
✓ Socket.IO
✓ Redis
✓ BullMQ
✓ Notifications
✓ Analytics
✓ Route history
```

---

# 48. Hackathon Version

This is where RouteForge becomes impressive:

```text
✓ Dynamic re-optimization
✓ Vehicle breakdown simulation
✓ New urgent order
✓ Driver unavailable
✓ Traffic delay
✓ What-if simulation
✓ Partial re-optimization
✓ Algorithm comparison
✓ Before/after metrics
✓ Live map
```

---

# 49. Development Roadmap

### Phase 1 — Backend Foundation

```text
Node
Express
TypeScript
PostgreSQL
Prisma
```

### Phase 2 — Optimization

```text
Mock data
↓
Bin packing
↓
Vehicle assignment
↓
Route optimization
↓
Cost calculation
```

### Phase 3 — API

```text
POST /optimization/run
```

### Phase 4 — Frontend

```text
Dashboard
Orders
Vehicles
Drivers
Optimization
Map
```

### Phase 5 — Real-time

```text
Redis
Socket.IO
BullMQ
```

### Phase 6 — Dynamic Optimization

```text
Breakdown
Traffic
Urgent order
Cancellation
```

### Phase 7 — Hackathon polish

```text
What-if simulation
Algorithm comparison
Metrics
Demo dataset
```

---

# 50. Hackathon Demo

Your demo should be **scenario-driven**, not feature-driven.

Start:

```text
127 orders
21 vehicles
16 drivers
```

Click:

> **Optimize Fleet**

Result:

```text
BEFORE              AFTER

21 vehicles         16 vehicles
2480 km             1930 km
₹38,400             ₹29,700
19 late             4 late
62% utilization     87% utilization
```

Then trigger:

> 🚨 **Vehicle V07 has broken down**

RouteForge detects affected orders.

```text
8 orders affected
3 routes affected
```

Then:

```text
RE-OPTIMIZING...
```

Result:

```text
Orders reassigned: 8
Routes changed: 3
Additional cost: ₹840
Late deliveries: 0
```

Then show:

> **What if we add one temporary vehicle?**

```text
Cost: ₹15,400
Late deliveries: 0
```

The dispatcher selects it.

That's your **hackathon "wow" moment**.

---

# 51. Success Metrics

The system should prove its value through measurable metrics.

### Primary

```text
↓ Total distance
↓ Operating cost
↓ Vehicles required
↓ Late deliveries
↓ Driver overtime
```

### Secondary

```text
↑ Vehicle utilization
↑ On-time delivery
↑ Average capacity utilization
↓ Dispatcher replanning time
```

Most important:

> **How much better is the optimized plan compared with the baseline?**

---

# 52. Baseline Comparison

Always maintain a baseline.

For example:

```text
Baseline:
First available vehicle
+
nearest route
+
manual driver assignment
```

Then compare your algorithm against it.

This allows you to say:

> "Our optimization reduced total route distance by 18.4% compared with the baseline."

That's much stronger than simply saying:

> "Our algorithm works."

---

# 53. Future Features

After the core system works:

### Multi-depot optimization

```text
Warehouse A
Warehouse B
Warehouse C
```

### EV fleet

Add:

```text
Battery level
Charging stations
Charging time
```

Optimize:

```text
Route
+
Charging
+
Delivery deadlines
```

### Carbon optimization

Add:

```text
CO₂ emissions
```

and allow the dispatcher to choose:

```text
Minimum Cost
Minimum Time
Minimum CO₂
Balanced
```

### Predictive ETA

Use historical data to improve ETA.

### Demand forecasting

Predict:

> Tomorrow's expected order volume.

---

# 54. Important Product Principle

**AI is optional. Optimization is mandatory.**

Don't make the core:

```text
LLM
 ↓
"Best route"
```

Instead:

```text
Constraints
 ↓
Optimization algorithm
 ↓
Feasible solution
```

AI can later help with:

* natural-language queries
* explaining optimization decisions
* summarizing fleet performance
* converting dispatcher instructions into constraints

For example:

> "Prioritize all Delhi deliveries before noon."

AI converts that into a constraint.

But the **optimization engine makes the actual decision**.

---

# 55. Final Positioning

### Weak positioning

> "RouteForge is a fleet management platform."

### Strong positioning

> **"RouteForge is a dynamic logistics optimization engine that continuously optimizes vehicle loading, routing, and driver allocation under real-world constraints."**

### Strongest hackathon pitch

> **"Traditional fleet software tells you where your vehicles are. RouteForge calculates where they should be — and automatically recalculates the plan when reality changes."**

That should be the central identity of the project.
