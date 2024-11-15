# 6.4.4 Architecture Definition process
## 1. Prepare for architecture definition.
### a. Review pertinent information and identify key drivers of the architecture.
- Key drivers are identifed by reviewing: (a) market studies, industry projections, competitor product plans, and scientific findings; (b) organizational strategies, organizational strategies, organizational-level concept of operations, organizational policies and directives, regulatory and legal constraints, and stakeholder requirements; (c) mission or business concept of operations, system-of-interest and related system operational concept, operational environment, technology roadmaps, and system/software requirements, and (d) other factors that impact the suitability of the software system through its life cycle. This analysis of key drivers typically builds from the Business or Mission Analysis, Stakeholder Requirements Definition, and System/software Requiremetns Definition processes.
- Key drivers of the architecture can include architecture styles and patterns, elements, principles such as replaceable components, feasibilty of implementation and integration; availability of COTS and open source components; data sources for data-intensive systems; and performance implications. The effect of choosing various design elements can be lessened if the software system is properly architected.
### b. Identify stakeholder concerns.
- Stakeholders are initially identified in the Stakeholder Needs and Requirements process. Additional stakeholders are usually identified during the Architecture Definition process. Stakeholder concerns related to architecture include system integrity concerns that the software system will be compromised intentionally or associated with the system's life cycle stages, such as utilization, support, evolution of the software system and its environment, production, and retirement.
- Concerns affecting software system architecture include data sources and performanece implications for data-intensive systems, and constraints on the use of outsourced, existing, new developed, proprietary, commerically available, or open source software elements, including software licensing. While software architecture is ideally design-agnostic, the feasibility of implementing the architecture in an affordable software system is a significant constraint for most systems.
### c. Define the Architecture Definition roadmap, approach, and strategy.
- This includes the identification of opportunities to communicate with designated stakeholders, the definition of architecture review activites, evaluation approach criteria, measurement approach, and measurement methods. The roadmap shows how the architecture will evolve to an envisioned end state and often has a longer timeframe than for the current system-of-interest. The approach is the manner in which the work will be accomplished, such as how to engage with stakeholders, how to vet the results, or where to do the work. The strategy deals with the systematic plan of action for implementiing the approach consistent with the roadmap.
### d. Define architechture evaluation criteria based on stakeholder concerns and key requirements.
### e. Identify and plan for the necessary enabling systems or services needed to support the Architecture Definition process.
- This includes identification of requirements and interfaces for the enabling systems and services. Enabling systems for architecture definition can include tools for collaboration and architecture development, and architecture reuse repositories for artifacts such as architecture patterns, models, and refrerence architectures.
### g. Obtain or acquire access to the enabling systems or services to be used.
- The Validation process is used to objectively confirm that the enabling system achieves its intended use for its enabling functions. The Infrastructure Management process supports reuse of enabling systems.
## 2. Develop architecture viewpoints.
### a. Select, adapt, or develop viewpoints and model kinds based on stakeholder concerns.
### b. Establish or identify potential architecture framework(s) to be used in developing models and views.
- Some architecture frameworks identify stakeholders and their concerns, and relevant viewpoints that address those concerns, while other architecture frameworks are more general in their guidance. Viewpoints specify the kinds of models to be used and how the resulting models can be used to generate architecture views. Refer to ISO/IEC/IEEE 42010 for more information on architecture framework and architecture description practices.
### c. Capture rationale for selection of framework(s), viewpoints and model kinds.
### d. Select or develop supporting modeling techniques and tools.
- Both the SWEBOK and ISO/IEC TR 24748-3 describe modeling techniques that support Architecture Definition and Design Definition of software elements.
## 3. Develop models and views of candidate architectures.
### a. Define the software system context and boundaries in terms of interfaces and interactions with external entities.
- This task is mainly based on the outcomes of the Business or Mission Analysis process, and is performed concurrently with the Stakeholder Needs and Requirements Definition process. It consists of identifying the entities external to the software system and defining the boundaries of the software system. The external enitites include the necessary enabling systems. The Architecture Definition process defines interfaces to the extent needed to support essential architectural decisions and understanding. These interface defintitions are then refined by the Design Definition process.
### b. Identify architectural entities and relationships between entities that address key stakeholder concerns and critical software system requirements.
- Achitecture is not necessarily concerned with all requriements, but rather only with those system/software requirememts that drive the architecture. On the other hand, the Design Definition process addresses and takes into account all the requirements. Sometimes, through the Architecture Definition process there will be requirements that are deemed to be inappropriate, unaffordable, or unsuitable. These are requirements issues that are resolved through iteration of the System/Software Requirements Definition process. It is also important that the architechture addresses key stakeholder concerns since not all of these will be captured in requirements.
### c. Allocate concepts, properties, characteristics, behaviors, functions, or constraints that are significant to architecture decisions of the software system to architectural entities.
- The items being allocated can be physical, logical, or conceptual.
### d. Select, adapt, or develop models of the candidate architectures of the software system
- It is common to use models in architecture definition. The models used are those that best address key stakeholder concerns. Refer to ISO/IEC/IEEE 42010 for how this can be done. Historically, it has been common to use logical and physical models in architecture definition. Information on logical and other models is provided in Annex F.
### e. Compose views from the models in accordance with identified viewpoints to express how the architecture addresses stakeholder concerns and meets stakeholder and system/software requirements.
### f. Harmonize the architecture models and views with each other.
- Correspondence rules from frameworks are one way to establish harmony between views. See ISO/IEC/IEEE 42010.
## 4. Relate the architecture to design.
### a. Identify software system elements that relate to the architectural entities and the nature of these relationships. 
- Sometimes the software system elements are initially notional until Design Definition has occurred since this depends on the actual design(s) to be done. Sometimes a "reference architecture" is created using these notional system elemetns as a means to convey architechtural intent and to check for design feasibility.
### b. Define the interfaces and interactions among the software system elements and external entities.
- This is defined at level of detail necessary to convey the architectural intent and can be further refined in the Design Definition process
### c. Partition, align and allocate requirements to architectural entities and system elements.
### d. Map software system elements elements and architectural entities to design characteristics.
### e. Define principles for the software system design and evolution.
- Principles can include interoperability, use of selected design pattern, ease of replacing and upgrading system elements, or security levels.
## 5. Assess architecture candidates.
### a. Assess each candidate architecture agianst constraints and requirements.
### b. Assess each candidate architecture against stakeholder concerns using evalution criteria.
- The System Analysis process and the Risk Management process can be used to support this task.
### c. Select the preferred architecture(s) and capture key decisions and rationale.
- The Decision Management process can be used to support this task.
### d. Establish the architecture baseline of the selected architecture
- The architecture baseline is composed of models, views and other relevant architecture descriptions.
## 6. Manage the selected architecture
### a. Formalize the architecure governance approach and specify goveranace-related roles and responsibilities, accountablities, and authorities related to design, quality, security, and safety.
### b. Obtain explicit acceptance of the architecture by stakeholders
- The Validation process is used to confirm that the architecture models and views reflect stakeholder requirements, that stakeholder concerns are addressed, and to help ensure that future iterations of software system architecture better address stakeholder concerns.
### c. Maintain concordance and completeness of the architectural entities and their architectural characteristics.
- The entities to be checked are not only technical. These are also, for example, legal, economical, organizational and operational entities that are normally part of stakeholder requirements and concerns.
### d. Organize, asses and control evolution of the architecture models and views to help ensure that architectural intent is met and the architectural vision and key concepts are correctly implemented.
### e. Maintain the architecture definition and evaluation strategy.
- This includes updating the architecture based upon technological, implementation, or operational experience. This includes the management of external and internal interfaces that are defined at this level of software system decomposition.
### f. Maintain traceability of the architecture.
- Throughout the life cycle, traceability is often maintained among the architectural entities of elements, the requirements and stakeholder concerns, software system design, interface definitions, analysis results, and verification methods or techniques.
### g. Provide key artifacts and information items that have been selected for baselines.
- The Configuration Management process is used to establish and maintain configuration items and baselines. This process identifies candidates for the baseline. The Information Management process controls the information items, such as architecture descriptions.
# 6.4.5 Design Definition process
## Prepare for software system design definition
### Define design definition strategy, consistent with the selected life cycle model and anticipated design artifacts
- Outcome: a. Design characteristics of each system element are defined.
- Weekly meetings help break down overall design into individual user stories 
### Select and prioritize design principles and design characteristicss
- Outcome: e. Design alternatives for system elements are assessed.
- By analyzing various options for design principle and characteristics, developers consider alternatives for their design. They best do this through a single shared codebase which forces developers to work cohesively so the design pattern makes sense for other parts of the system
### Identify and plan for the necessary enabling systems or services needed to support design definition**
- Outcome: c. Design enablers necessary for design definition are selected or defined. 
- Monthly meetings discuss identification of requirements and interfaces; selection of software and system platforms, programming languages, design notations and tools for collaboration and design development, design reuse repositories and design standards
### Obtain or require access to the enabling systems or services to be used
- Outcome: g. Any enabling systems or services needed for design definition are available
- Using a single shared codebase ensures proper branch protection and permissions which contirbutes to ensuring proper access controls
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
- Outcome: h. Traceability of the design characteristics to the architectural entities of the system architecture is established.
- User stories should be connected to requirements and implementation allowing forward and backward traceability
### Determine status of the software system and element design
- Measures for completeness and quality of the design as it progresses
- Includes periodic assessment of design characteristics in case of evolution of the software system and predicting potential obsolescence of components and technologies like Svelte and those consequences. Risk evaluation in this context
### Provide key artifacts and information items that have been selected for baselines
- Outcome: f. Design artifacts are developed.
- Continuous integration ensures all necessary items are continuously added 
