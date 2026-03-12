export const quizData = [
    {
        id: 1,
        questionEn: "What is a 'Family' in Revit?",
        optionsEn: [
            "A group of people working on a project",
            "A standalone 3D modeling software",
            "A category of elements with common parameters and similar graphical representation",
            "A type of file extension in Windows"
        ],
        correctAnswerIndex: 2,
        explanation: "In Revit, a Family is a group of elements with a common set of properties, called parameters, and a related graphical representation."
    },
    {
        id: 2,
        questionEn: "Which of the following is NOT a type of Revit Family?",
        optionsEn: ["System Family", "Loadable Family", "In-Place Family", "Dynamic Family"],
        correctAnswerIndex: 3,
        explanation: "Revit has three main kinds of families: System Families (built-in like walls/floors), Loadable Families (.rfa files), and In-Place Families (custom built within a project). 'Dynamic Family' is not a standard Revit term."
    },
    {
        id: 3,
        questionEn: "What file extension is used for Revit Family files?",
        optionsEn: [".rvt", ".rfa", ".rte", ".rft"],
        correctAnswerIndex: 1,
        explanation: ".rfa stands for Revit Family. (.rvt is Project, .rte is Project Template, .rft is Family Template)"
    },
    {
        id: 4,
        questionEn: "Which tool is used to create a solid 3D shape by pushing a 2D profile forward?",
        optionsEn: ["Blend", "Revolve", "Extrusion", "Sweep"],
        correctAnswerIndex: 2,
        explanation: "An Extrusion takes a 2D sketch (profile) on a work plane and pushes it linearly into a 3D solid geometry."
    },
    {
        id: 5,
        questionEn: "What is the purpose of Reference Planes in family creation?",
        optionsEn: [
            "To add color to the model",
            "To act as a skeleton or framework to control geometry and parameters",
            "To export the family to AutoCAD",
            "To create shadow effects"
        ],
        correctAnswerIndex: 1,
        explanation: "Reference Planes are the invisible skeletal structure of a family. You constrain 3D geometry to them, and parameters drive the planes to flex the model."
    },
    {
        id: 6,
        questionEn: "Which of these is used to define dimensions that can be changed by the user?",
        optionsEn: ["Static Text", "Symbolic Lines", "Parameters", "Detail Components"],
        correctAnswerIndex: 2,
        explanation: "Parameters allow variables (like dimensions, materials, or text) to be adjustable by the user when the family is loaded into a project."
    },
    {
        id: 7,
        questionEn: "What is a 'Type Parameter'?",
        optionsEn: [
            "A parameter that affects only a single instance of the family in the project",
            "A parameter that affects all instances of that specific family type in the project",
            "A text-only parameter",
            "A parameter used only for rendering"
        ],
        correctAnswerIndex: 1,
        explanation: "Type Parameters apply globally to all elements of that Type. If you change a Type Parameter, every matching object in the project updates instantly."
    },
    {
        id: 8,
        questionEn: "What is an 'Instance Parameter'?",
        optionsEn: [
            "A parameter that affects only the specific individual element selected",
            "A parameter that controls the materials of all families",
            "A parameter that defines the family's name",
            "A parameter used to connect pipes"
        ],
        correctAnswerIndex: 0,
        explanation: "Instance Parameters apply only to the single element you have selected. Changing it does not affect other copies of the same family."
    },
    {
        id: 9,
        questionEn: "Which family template is best for creating a standard pump or AHU?",
        optionsEn: [
            "Metric Generic Model.rft or Metric Mechanical Equipment.rft",
            "Metric Furniture.rft",
            "Metric Door.rft",
            "Metric Detail Item.rft"
        ],
        correctAnswerIndex: 0,
        explanation: "Pumps and Air Handling Units (AHUs) are categorized as Mechanical Equipment. You should start with a Mechanical Equipment or Generic Model template."
    },
    {
        id: 10,
        questionEn: "What tool allows a solid to follow a 2D path?",
        optionsEn: ["Extrusion", "Sweep", "Blend", "Void Forms"],
        correctAnswerIndex: 1,
        explanation: "A Sweep requires a 2D Path and a 2D Profile. It sweeps the profile along the drawn path to create a continuous 3D shape (like a pipe or molding)."
    },
    {
        id: 11,
        questionEn: "What is the function of a 'Void Form'?",
        optionsEn: [
            "To add volume to a solid",
            "To apply paint to a surface",
            "To cut away or remove geometry from a Solid Form",
            "To create MEP connectors"
        ],
        correctAnswerIndex: 2,
        explanation: "Void Forms act as negative space. Wherever a void intersects a solid form within a family, it carves away or 'cuts' that volume out."
    },
    {
        id: 12,
        questionEn: "To make a parameter control a dimension, you must do what to the dimension?",
        optionsEn: ["Lock it", "Delete it", "Label it with a parameter", "Hide it in view"],
        correctAnswerIndex: 2,
        explanation: "Applying a parameter to a dimension is called 'Labeling'. You select the dimension and assign it a labeled parameter to make it intelligent/flexible."
    },
    {
        id: 13,
        questionEn: "What is nested family?",
        optionsEn: [
            "A family saved in a nest folder",
            "A family loaded into another family to become part of it",
            "A family exclusively used for plumbing",
            "A family that cannot be parameterized"
        ],
        correctAnswerIndex: 1,
        explanation: "Nesting is the process of loading one or more component families into another 'host' family to create more complex assemblies and improve performance."
    },
    {
        id: 14,
        questionEn: "Which option allows a nested family parameter to be controlled by the host family?",
        optionsEn: ["Linking parameters", "Locking dimensions", "Grouping elements", "Hiding elements"],
        correctAnswerIndex: 0,
        explanation: "You can click the small equal button '=' next to a nested family's parameter to 'link' or map it to a parameter in the main host family."
    },
    {
        id: 15,
        questionEn: "If you want a dimension to remain exactly 150mm regardless of family size, you should:",
        optionsEn: [
            "Create an instance parameter",
            "Lock the dimension",
            "Delete the reference planes",
            "Use a void extrusion"
        ],
        correctAnswerIndex: 1,
        explanation: "Locking a dimension ensures that the distance between those two reference planes will always remain rigid and constant when the family flexes."
    },
    {
        id: 16,
        questionEn: "What is an MEP Connector?",
        optionsEn: [
            "A tool to join two pieces of furniture",
            "An element that allows MEP systems (Pipes, Ducts, Conduits) to logically connect and transfer data",
            "A parameter type for electrical voltage",
            "A file format for MEP projects"
        ],
        correctAnswerIndex: 1,
        explanation: "Connectors are the critical logic points on equipment. They allow pipes, ducts, wire, and conduits to snap directly to the unit and calculate flow/load."
    },
    {
        id: 17,
        questionEn: "Which naming convention is most helpful when organizing many Revit families in a library?",
        optionsEn: [
            "Using random numbers so names are short",
            "Using clear, consistent names that start with category and purpose (e.g. MECH_Pump_DoubleSuction)",
            "Naming every family 'Generic Model 1'",
            "Using only manufacturer catalog numbers with no description"
        ],
        correctAnswerIndex: 1,
        explanation: "A structured naming convention that starts with discipline/category and describes the function makes it much easier to search, filter, and maintain a large family library."
    },
    {
        id: 18,
        questionEn: "Why is it recommended to keep 3D geometry in Revit families as simple as possible?",
        optionsEn: [
            "To make the family look less realistic on purpose",
            "To reduce file size and improve model performance when many instances are placed",
            "Because Revit cannot handle curved shapes",
            "So the family cannot be scheduled"
        ],
        correctAnswerIndex: 1,
        explanation: "Overly detailed geometry increases file size and graphics load. Clean, simple geometry keeps projects lighter and faster, especially when hundreds of instances are used."
    },
    {
        id: 19,
        questionEn: "What is one main advantage of creating multiple Types within a single family instead of separate family files?",
        optionsEn: [
            "Types cannot be scheduled, but families can",
            "It allows many sizes or options to be managed in one file and swapped easily in the project",
            "It prevents parameters from being edited",
            "It forces every instance to be identical"
        ],
        correctAnswerIndex: 1,
        explanation: "Using Types keeps related sizes or variants in one family, simplifies library management, and lets users quickly switch between sizes without loading new families."
    },
    {
        id: 20,
        questionEn: "What typically happens to a wall-hosted family instance if the host wall is deleted in the project?",
        optionsEn: [
            "The family instance is automatically converted to a free-standing element",
            "The family instance is deleted or becomes orphaned and must be reassigned",
            "Nothing happens; the family ignores its host",
            "The family switches category to Generic Models"
        ],
        correctAnswerIndex: 1,
        explanation: "Host-based families depend on their hosts. If the host is removed, the element is usually deleted or reported as orphaned, reinforcing the importance of choosing the correct hosting behavior."
    },
    {
        id: 21,
        questionEn: "Which Connector allows linking directly to a surface without defining a specific coordinate rotation?",
        optionsEn: ["Face-based Connector", "Surface Connector", "Free Connector", "Work Plane Connector"],
        correctAnswerIndex: 0,
        explanation: "A Face-Based connector snaps to the geometry's face and inherits the orientation of that face."
    },
    {
        id: 22,
        questionEn: "What happens if a Family is created without any Reference Planes?",
        optionsEn: [
            "Revit will crash immediately",
            "The geometry will float around and cannot be parametricaly constrained easily",
            "It will become a System Family",
            "It will automatically generate reference planes"
        ],
        correctAnswerIndex: 1,
        explanation: "Without Reference Planes driving the geometry, the model cannot reliably 'flex' when dimensions change, making it a rigid and fragile family."
    },
    {
        id: 23,
        questionEn: "What does the 'Is Reference' property of a Reference Plane do?",
        optionsEn: [
            "Makes it invisible",
            "Determines its behavior when dimensioning and aligning instances in the project",
            "Changes its color",
            "Converts it to a model line"
        ],
        correctAnswerIndex: 1,
        explanation: "Setting 'Is Reference' to Strong/Weak/Not a Reference tells Revit whether users can snap dimensions to this internal plane once loaded into the project."
    },
    {
        id: 24,
        questionEn: "What is a 'Shared Parameter'?",
        optionsEn: [
            "A parameter used in schedules and tags across multiple families and projects",
            "A parameter that shares its value with all other parameters automatically",
            "A network file sharing system",
            "A parameter created by AutoCAD"
        ],
        correctAnswerIndex: 0,
        explanation: "Shared Parameters are required if you want a family parameter to appear in Revit Schedules or be read by graphical Tags."
    },
    {
        id: 25,
        questionEn: "Where do Shared Parameters live?",
        optionsEn: [
            "Inside the family file only",
            "Inside a separate external .txt file",
            "Inside the Windows Registry",
            "In the Revit memory cache"
        ],
        correctAnswerIndex: 1,
        explanation: "Shared Parameters are stored in an external, centralized .txt file so that every family and project reads the exact same GUID definitions."
    },
    {
        id: 26,
        questionEn: "How do you control Visibility of different geometry parts (e.g., showing high details vs low details)?",
        optionsEn: [
            "Delete them when not needed",
            "Use the 'Visibility/Graphics Overrides' button on the geometry's properties",
            "Change the material color to transparent",
            "Use void forms"
        ],
        correctAnswerIndex: 1,
        explanation: "The Visibility/Graphics Overrides dialog allows you to hide/show complex 3D geometry depending on whether the view is set to Coarse, Medium, or Fine."
    },
    {
        id: 27,
        questionEn: "What is a 'Reporting Parameter' used for in a family?",
        optionsEn: [
            "To report file size to the BIM manager",
            "To read a driven value from a dimension or host and use it in formulas",
            "To export schedules directly to Excel",
            "To report who last edited the family"
        ],
        correctAnswerIndex: 1,
        explanation: "Reporting parameters read values controlled by dimensions or hosts (such as host thickness) and feed them into formulas, allowing geometry to react intelligently without being freely editable by the user."
    },
    {
        id: 28,
        questionEn: "What formula operator is used for Multiplication?",
        optionsEn: ["+", "-", "/", "*"],
        correctAnswerIndex: 3,
        explanation: "The asterisk (*) symbol is the standard operator for multiplication inside Revit formulas."
    },
    {
        id: 29,
        questionEn: "Which property allows a family to automatically cut a hole in a host wall?",
        optionsEn: [
            "Cut with Voids When Loaded",
            "Make Transparent",
            "Always Vertical",
            "Shared"
        ],
        correctAnswerIndex: 0,
        explanation: "The 'Cut with Voids When Loaded' parameter allows an independent family to use its internal void forms to slice into elements like walls, floors, or roofs."
    },
    {
        id: 30,
        questionEn: "What is an 'Always Vertical' parameter inside Family Category and Parameters?",
        optionsEn: [
            "Forces geometry to never rotate, keeping it strictly upright even if the host changes angle",
            "Eliminates horizontal lines",
            "Turns the family into a column",
            "Deletes the x-axis"
        ],
        correctAnswerIndex: 0,
        explanation: "This setting forces the family (like a tree or lamppost) to stand perfectly upright, even if the host floor/slope is on a steep angle."
    },
    {
        id: 31,
        questionEn: "What does the 'Work Plane-Based' parameter do?",
        optionsEn: [
            "Allows the family to only be placed on level 1",
            "Forces the family to be hosted by a specific work plane instead of a solid face",
            "Makes the family flat",
            "Removes 3D geometry"
        ],
        correctAnswerIndex: 1,
        explanation: "It unpins the family from level requirements and allows it to be anchored directly onto drawn Reference Planes, Levels, or Grids in the project."
    },
    {
        id: 32,
        questionEn: "If calculating Area (Width * Length), the resulting parameter Type must be:",
        optionsEn: ["Length", "Area", "Volume", "Text"],
        correctAnswerIndex: 1,
        explanation: "Revit strictly enforces Units. Multiplying Length * Length mathematically results in an Area, so the destination parameter Type MUST be defined as 'Area'."
    },
    {
        id: 33,
        questionEn: "In formulas, what happens if you add 'Length' to 'Text'?",
        optionsEn: [
            "It creates a descriptive sentence",
            "Revit returns an 'Inconsistent Units' error",
            "It works perfectly",
            "It automatically converts text to numbers"
        ],
        correctAnswerIndex: 1,
        explanation: "Revit requires dimensional consistency. You cannot directly add, subtract, or multiply parameters of incompatible units without special workarounds."
    },
    {
        id: 34,
        questionEn: "What is an 'IF' statement used for in family formulas?",
        optionsEn: [
            "To delete unwanted parameters",
            "To create conditional logic (e.g., if Width > 1000, value A, otherwise value B)",
            "To import families",
            "To connect pipes"
        ],
        correctAnswerIndex: 1,
        explanation: "IF statements use conditional logic: 'if (Condition, Result_If_True, Result_If_False)' which is extremely powerful for intelligent MEP components."
    },
    {
        id: 35,
        questionEn: "What tool allows drawing a 2D sequence of lines representing symbols in Floor Plans?",
        optionsEn: ["Model Lines", "Symbolic Lines", "Extrusion", "Sweep"],
        correctAnswerIndex: 1,
        explanation: "Symbolic lines are purely 2D detailing graphics. They appear only in views parallel to the view they were sketched in (e.g. Plan views for switches)."
    },
    {
        id: 36,
        questionEn: "What is the difference between Model Lines and Symbolic Lines?",
        optionsEn: [
            "Model Lines are visible in 3D; Symbolic Lines are visible only in parallel 2D views",
            "Symbolic Lines are 3D; Model Lines are 2D",
            "Model lines are only for MEP",
            "There is no difference"
        ],
        correctAnswerIndex: 0,
        explanation: "Model Lines exist as 3D physical strings in space (visible everywhere). Symbolic Lines are 2D drafting lines (visible only in specific flat views)."
    },
    {
        id: 37,
        questionEn: "What is a key characteristic of a Line-Based family in Revit?",
        optionsEn: [
            "It can only be placed at the project origin",
            "It is placed by picking two points, creating geometry that stretches along a line",
            "It can only be used for annotation",
            "It cannot contain parameters"
        ],
        correctAnswerIndex: 1,
        explanation: "Line-Based families are hosted on a line defined by two points, making them ideal for elements like cable trays, ducts, trims, or linear accessories that need a controllable length."
    },
    {
        id: 38,
        questionEn: "What is the primary purpose of an Annotation family?",
        optionsEn: [
            "To create 3D physical equipment",
            "To represent 2D symbols, tags, and notes that display relative to view scale",
            "To control project levels",
            "To store only materials"
        ],
        correctAnswerIndex: 1,
        explanation: "Annotation families are 2D elements such as tags, symbols, and notes that scale with the view and do not represent actual 3D geometry in the model."
    },
    {
        id: 39,
        questionEn: "In the Family Editor, which view is most commonly used as the primary workspace for building 3D geometry?",
        optionsEn: [
            "Perspective 3D view",
            "Any Legend view",
            "Ref. Level (plan) or other orthographic views aligned to reference planes",
            "Project browser view"
        ],
        correctAnswerIndex: 2,
        explanation: "Most geometry is created in Ref. Level or similar orthographic views aligned with reference planes, ensuring accurate constraints and predictable behavior in the project."
    },
    {
        id: 40,
        questionEn: "Why might you assign different Subcategories to parts of a family's geometry?",
        optionsEn: [
            "To allow more granular control of visibility and lineweight through View Templates and Object Styles",
            "To change the family’s Category automatically",
            "To reduce the number of parameters",
            "To prevent the family from being scheduled"
        ],
        correctAnswerIndex: 0,
        explanation: "Subcategories let you independently control how different parts of a family appear in views (lineweight, color, patterns, visibility) without needing separate families."
    },
    {
        id: 41,
        questionEn: "What is one benefit of marking a nested family as 'Shared'?",
        optionsEn: [
            "It hides the nested family from schedules",
            "It allows the nested component to appear individually in schedules and tags in the project",
            "It locks the nested family so it cannot be edited",
            "It automatically reduces file size"
        ],
        correctAnswerIndex: 1,
        explanation: "Shared nested families can be tagged and scheduled as separate elements in the project, which is useful for representing assemblies made of multiple measurable components."
    },
    {
        id: 42,
        questionEn: "When publishing a family to a shared library, which of the following is a good practice?",
        optionsEn: [
            "Leaving all parameters uncategorized and unnamed",
            "Cleaning unused parameters and types so only production-ready options remain",
            "Including every test type used during development",
            "Saving multiple experimental versions of the family in the same file"
        ],
        correctAnswerIndex: 1,
        explanation: "Before publishing, you should remove test types and unused parameters so the library contains only clean, production-ready content that is easy for others to use."
    },
    {
        id: 43,
        questionEn: "What is a good reason to include a 'Type Mark' or similar identification parameter in a family?",
        optionsEn: [
            "To prevent the family from being tagged",
            "To provide a stable code that can be used in schedules, tags, and documentation",
            "To control view scale",
            "To disable instance parameters"
        ],
        correctAnswerIndex: 1,
        explanation: "Consistent identification parameters like Type Mark help connect the model to specifications, schedules, and tags by giving each type a stable, referenceable code."
    },
    {
        id: 44,
        questionEn: "Which element establishes the precise starting coordinate (0,0,0) of the family?",
        optionsEn: [
            "The Origin point of intersecting Reference Planes checked as 'Defines Origin'",
            "The top left corner of the geometry",
            "The center point of the bottom solid",
            "The first connector placed"
        ],
        correctAnswerIndex: 0,
        explanation: "The insertion origin point is dictated by the intersection of the two Reference Planes that have their 'Defines Origin' property checked."
    },
    {
        id: 45,
        questionEn: "Can you change the Category of a family after creating it?",
        optionsEn: [
            "No, it is permanently locked",
            "Yes, via the Family Category and Parameters button",
            "Only if it contains no geometry",
            "Only using a third-party plugin"
        ],
        correctAnswerIndex: 1,
        explanation: "Yes, you can easily change a 'Generic Model' into 'Mechanical Equipment' simply by opening Category/Parameters and selecting a different category."
    },
    {
        id: 46,
        questionEn: "Which statement is true for Arraying geometries in Family Editor?",
        optionsEn: [
            "Arrays cannot be parameterized",
            "You can parameterize the number of array elements using an Integer parameter",
            "Arrays can only be circular",
            "Arrays immediately turn into nested families"
        ],
        correctAnswerIndex: 1,
        explanation: "If you select the array line, you can assign it a label, mapping it to an Integer (whole number) type parameter to dynamically change the quantity."
    },
    {
        id: 47,
        questionEn: "When using the 'Blend' tool, how many profiles do you sketch?",
        optionsEn: ["One", "Two (a Top and a Bottom)", "Three", "Four"],
        correctAnswerIndex: 1,
        explanation: "A Blend morphs between two different profiles: a base boundary (sketched first) and a top boundary (sketched second)."
    },
    {
        id: 48,
        questionEn: "What happens to elements when you change the Detail Level in the bottom bar?",
        optionsEn: [
            "Nothing happens",
            "The family visibility settings determine which geometries or lines display based on Coarse, Medium, or Fine",
            "The family is exported to AutoCAD",
            "All dimensions are deleted"
        ],
        correctAnswerIndex: 1,
        explanation: "Visibility settings let developers show boxes in 'Coarse' (for performance) and intricate 3D shapes only in 'Fine' views."
    },
    {
        id: 49,
        questionEn: "What parameter type is 'Tick Box' formatting?",
        optionsEn: ["Text", "Number", "Yes/No", "Material"],
        correctAnswerIndex: 2,
        explanation: "A parameter defined as 'Yes/No' displays as a tick/check-box in the properties panel."
    },
    {
        id: 50,
        questionEn: "Why should you use 'Reference Lines' instead of 'Reference Planes' for angular parameters?",
        optionsEn: [
            "Because planes cannot rotate well around a fixed point without breaking constraints",
            "Because lines have color and planes do not",
            "Reference Lines are longer",
            "Reference Lines are 3D"
        ],
        correctAnswerIndex: 0,
        explanation: "Reference Planes extend infinitely and often cause constraints to snap during angular sweeps. Reference Lines have specific start/end nodes that are stable during rotation."
    }
];
