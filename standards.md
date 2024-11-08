# 6.4.4 Design Definition process
## Prepare for software system design definition
### Define design definition strategy, consistent with the selected life cycle model and anticipated design artifacts
- Can include initial or incremental decomposition into system elements; various views of automated procedures, data structures and control systems; selection of design patterns; or progressively more detailed definition of objects and their relationships
### Select and prioritize design principles and design characteristics** 
- Design principles include controlling ideas such as abstraction, modularization and encapsulation; separation of interface and implementation, concurrency, and persistence of data. Security considerations include the principle of least privilege, layered defenses, restricted access to system services, and other considerations to minimize and defend the system attack surface. Examples of design characteristics include availability, fault tolerance and resilience, scalability, usability, capacity and performance, testability, portability, and affordability
### Identify and plan for the necessary enabling systems or services needed to support design definition**
-Includes identification of requirements and interfaces; selection of software and system platforms, programming languages, design notations and tools for collaboration and design development, design reuse repositories and design standards
### Obtain or require access to the enabling systems or services to be used**
-Validation process confirms system achieves intended use

## Establish designs related to each software system element
### Transform architectural and design characteristics into design of elements
- Databases, data structures, provisions for memory and storage
### Define and prepare or obtain necessary design enablers
- Include algorithms for dashboard view analytics
### Examine design alternatives and feasibility of implementation
- Reuse, adaptation, and outsourced service are examined
### Refine or define interfaces among the software system elements and with external entities
- Interfaces are identified and defined in the architecture definition process to the extent needed
### Establish design artifacts
- Formalized artifacts include data models, entity relationship diagrams, use cases, user role and privilege matrices, procedures. These are developed, obtained, or modified for selected alternatives.

## Assess alternatives for obtaining software system elements
### Determine technologies required for each element composing software system
- E.g. internet presence, embedded systems, adaptations of open source software, human operator roles
### Identify candidate alternatives for software system elements
- Include free and open source software packages or elements, reuse of a previous design, adaptations of existing components, objects, or services
### Assess each candidate alternative against criteria developed from expected design characteristics and element requirements to determine suitability for intended application
- A make-or-buy decision and resulting implementation and integration approach typically involve trade-offs of design criteria including cost. Design choices commonly consider enabling systems required to test the candidate alternative (test-driven design and development) and sustainability over system life including maintenance costs (or lack thereof). Basically used to determine suitability of design for long-term maintenance and sustainability
### Choose preferred alternatives among candidate design solutions for software system elements
## Manage the design
### Capture design and rationale
- Commonly captured information includes software elements and affiliated requirements and design data e.g. internal and external interfaces, data structures, implementation and test requirements, unit aggregation data for integration and test cases. Rationale typically includes information about major implementation options and enablers. Resultant design is controlled in accordance with the strategy
### Establish traceability between the detailed design elements, the requirements, and the architectural entities
### Determine status of the software system and element design
- Measures for completeness and quality of the design as it progresses
- Includes periodic assessment of design characteristics in case of evolution of the software system and predicting potential obsolescence of components and technologies like Svelte and those consequences. Risk evaluation in this context
### Provide key artifacts and information items that have been selected for baselines
