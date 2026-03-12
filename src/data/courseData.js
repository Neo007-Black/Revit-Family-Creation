export const courseData = [
    {
        id: "course-objectives",
        title: "1. Course Objectives",
        description: "What you will learn in this MEP Family Creation course.",
        duration: "5 mins",
        icon: "Target",
        content: `
# Course Objectives: What You Will Learn

Throughout this course, you will embark on a journey that will empower you to:

*   **Understand the Significance of Families:** Discover why families are the backbone of Revit MEP projects and how they contribute to intelligent and efficient building design.
*   **Master Family Creation Tools:** Gain proficiency in the Family Editor, where you'll create and customize parametric families from the ground up.
*   **Design MEP Components:** Learn to craft custom MEP components such as HVAC equipment, plumbing fixtures, and electrical devices tailored to your project's needs.
*   **Harness the Power of Parameters:** Understand how to define and control parameters to make your families flexible and adaptable to various design scenarios.
*   **Troubleshoot and Optimize:** Acquire the skills to identify and resolve common family creation challenges while optimizing your families for peak performance.
*   **Integrate Families into Real Projects:** Apply your family creation expertise to actual projects, enhancing your ability to create highly specialized and efficient MEP systems.
    `
    },
    {
        id: "what-is-a-revit-family",
        title: "2. What is a Revit Family?",
        description: "Understand the fundamental organizational unit of all elements within a BIM model.",
        duration: "10 mins",
        icon: "FileQuestion",
        content: `
# What is a Revit Family?

- A family is a group of elements with a common set of properties, called parameters, and a related graphical representation.
- All of the elements that you add to your Revit projects are created with families.

For example, the structural members, walls, roofs, windows, and doors that you use to assemble a building model, as well as the callouts, fixtures, tags, and detail components that you use to document it, are all created with families.

By using predefined families and creating new ones in Revit, you can add both standard and custom elements to your building models. Families also provide a level of control over elements that are similar in use and behavior, allowing you to easily make design changes and manage your projects more efficiently.

### 2D vs 3D Families

- All families can be two-dimensional, three-dimensional, or both, but not all families have to be parametric.
- Elements created with families that do not need more than one size or type may remain non-parametric.
- **Duct and piping families** are examples of 3D families, which display accordingly in isometric and plan views.
- **Annotation detail families** are examples of 2D families that do not require 3D representations.

<FamilyConceptSimulator />
    `
    },
    {
        id: "revit-family-types",
        title: "3. Revit Family Types",
        description: "System vs Loadable vs In-Place families.",
        duration: "15 mins",
        icon: "Layers",
        content: `
# About Revit Family Types

Revit classifies families into three distinct types. Understanding the difference is crucial for MEP modeling because different equipment and systems rely on different family types.

<FamilyTypeTree />

<FamilyTypeTabs />
    `
    },
    {
        id: "library-and-category",
        title: "4. Library & Category",
        description: "How Revit organizes its vast library of elements.",
        duration: "10 mins",
        icon: "Library",
        content: `
# About Revit Library & Category

### The Revit Library Structure
Revit content is standardized and organized into specific library folders (e.g., US Metric or Singapore standards). The library is generally split between:
1. **MEP/Architecture**
2. **Structure**

### Revit Categories
Within a project, elements are organized into Categories. The primary categories are:
*   **Model Categories:** The physical 3D elements (Ducts, Pipes, Air Terminals, Mechanical Equipment).
*   **Annotation Categories:** 2D elements used for documentation (Tags, Dimensions, Text).
*   **Analytical Model Categories:** Specialized elements used for structural or energy analysis.
*   **Imported Categories:** Elements brought in from DWG or other external formats.

<CategoryTree />
    `
    },
    {
        id: "geometric-forms",
        title: "5. Geometric Forms",
        description: "The 5 basic methods of creating 3D solids and voids.",
        duration: "25 mins",
        icon: "Box",
        content: `
# About Revit Geometric Forms

When creating a Loadable Family in the Family Editor, you build the 3D shape using a combination of **Solid Forms** and **Void Forms**.

Revit provides 5 fundamental tools to turn 2D drawings (Profiles) into 3D objects. 

<GeometryBuilder />

### Solid Form vs Void Form
**Solid forms** create physical mass. **Void forms** use the exact same 5 methods (Extrusions, Blends, etc.) but they must be placed inside or intersecting a solid form to create a "subtracted" area. For example, a void extrusion could cut a hole in a solid extrusion to create a sink basin.
    `
    },
    {
        id: "revit-parameters",
        title: "6. About Parameters",
        description: "The data that drives parametric modeling.",
        duration: "20 mins",
        icon: "Settings2",
        content: `
# About Parameters

Parameters are the intelligent data behind Revit families. They define the size, shape, material, and identity of the elements.

### The 5 Types of Parameters
1.  **System Parameters:** Built-in by default in Revit; they can never be removed, renamed or modified.
2.  **Project Parameters:** Used to assign new parameters to any category of elements in a specific project.
3.  **Family Parameters:** Created inside families to control their specific geometry or data.
4.  **Shared Parameters:** Saved in a separate text file so they can be shared among multiple families, projects, and tags (crucial for standardized scheduling).
5.  **Global Parameters:** Specific to a project environment to control multiple element parameters at once.

---

### Instance vs Type Parameters

When you create a Family Parameter, you must decide if it is a Type or Instance parameter:

*   **Type Parameter:** Applies to all elements of that specific "Type". For example, if you change the "Height" Type parameter of a specific Air Handling Unit, *every single instance* of that unit in the entire project will update to the new height.
*   **Instance Parameter:** Modifies the value separately for *every single instance*. For example, the "Offset" (elevation from the floor) of a pipe is an Instance parameter, because two pipes of the same Type can be at different elevations.

<ParameterExplorer />
    `
    },
    {
        id: "reference-planes-lines",
        title: "7. Reference Planes & Lines",
        description: "The invisible skeleton of your families.",
        duration: "15 mins",
        icon: "Ruler",
        content: `
# Reference Plane & Reference Line

Before drawing any 3D geometry in the Family Editor, you must build a "skeleton" using Reference Planes and Lines.

### Reference Line
A Reference Line is a 3D guideline that has 4 reference planes (whereas curved lines offer 2). It acts like 2D or 3D lines but is not visible in the project when loaded. **It is normally used to constraint angles (rotation)** in the family editor.

### Reference Plane
A Reference Plane is a 2-dimensional surface (like a plan view) to draw on. It is an independent workplane, meaning you can set it up wherever you want. It is the primary guideline used when creating a family.

#### Hierarchy of Reference Planes
There are hierarchies that determine which reference planes get "snapped" to first when the family is loaded into a project:
1.  **Strong Reference:** High priority for dimensioning and snapping.
2.  **Weak Reference:** Second priority for dimensioning and snapping.
3.  **Not A Reference:** No dimensioning or snapping allowed.

> **Crucial Rule:** The intersection of the reference planes marked with 'Defines Origin' will become the insertion point/origin when you place the family in your MEP project.

<ReferenceSimulator />
    `
    },
    {
        id: "constraints",
        title: "8. What is Constraints?",
        description: "Locking geometry to your reference skeletons.",
        duration: "15 mins",
        icon: "Lock",
        content: `
# What is Constraints?

Constraints build intelligence into the model, defining relationships and interdependencies between elements. You create constraints by applying **locked dimensions**, **alignments**, or attaching elements together.

### Equality Constraints (EQ)
You can specify that a series of elements are equally spaced within a specified distance.
When you select a multi-segmented dimension, an **EQ** symbol appears. Clicking this EQ symbol applies an "equality constraint". The references (like reference planes) will remain at equal distances from one another while this is active. If you stretch the overall width of the family, the planes inside will space themselves equally automatically.

### Locking Dimensions
To create a permanent constraint, you apply a dimension between two references and click the **Lock Icon** (🔒).
For example, if you dimension a Reference Plane to be strictly 50mm from the edge of a wall, locking it ensures that no matter what, that plane stays 50mm away.

<ConstraintSimulator />
    `
    },
    {
        id: "family-templates",
        title: "9. Family Template Types",
        description: "Starting off on the right foot.",
        duration: "10 mins",
        icon: "FileJson",
        content: `
# About Revit Template Types
When creating a new family, the software provides many \`.rte\` templates (.rft for family templates) containing much of the information that Revit needs to categorize and host the family correctly.

Templates are categorized by behavior, such as:
*   **Standalone Components:** \`Metric Generic Model.rft\`
*   **Hosted Components:**
    *   Ceiling Based
    *   Face Based (Highly recommended for MEP fixtures attached to walls/ceilings)
    *   Floor Based
    *   Line Based
    *   Roof Based
    *   Wall Based
*   **Profile Based:**
    *   Profile Hosted, Mullion, Rail, Reveal, Stair Nosing.

Choosing the right template is the critical first step. For MEP, you often use \`Metric Mechanical Equipment.rft\` or a \`Metric Generic Model face based.rft\` that you later change to the Mechanical Equipment category.

<TemplateSelector />
    `
    },
    {
        id: "workflow",
        title: "10. Creation Workflow",
        description: "The 14-step checklist for building perfect families.",
        duration: "20 mins",
        icon: "ListChecks",
        content: `
# Revit Family Creation Workflow

Creating a parametric Revit family requires a systematic approach. Skipping steps (like drawing 3D forms before placing reference planes) will result in broken, unpredictable geometry.

Follow this 14-step workflow for every family you build:

<WorkflowChecklist />

    `
    },
    {
        id: "formulas-lookups",
        title: "11. Formulas & Lookup Tables",
        description: "Advanced math and CSV data tables for pipes & conduits.",
        duration: "25 mins",
        icon: "Calculator",
        content: `
# Formulas & Lookup Tables

### Formulas
You can use mathematical formulas to calculate parameter values dynamically.
*   **Basic Math:** \`+\`, \`-\`, \`*\`, \`/\`, \`^\` (Exponentiation)
*   **Rounding:** \`round(x)\`, \`roundup(x)\`, \`rounddown(x)\`
*   **Trigonometry:** \`sin\`, \`cos\`, \`tan\`, \`asin\`, \`acos\`, \`atan\`
*   **Conditionals ("If" statements):** \`if(condition, result_if_true, result_if_false)\`
*   *Note on >= and <=*: These are not currently available directly in Revit conditional syntax. You must express them using NOT.
    *   Example: \`x <= y\` must be written as \`NOT(x > y)\`

<FormulaSimulator />
### About Lookup Tables
Lookup tables are heavily used for **pipe and conduit families** to define parameter values via an external comma-separated values (CSV) file.

Instead of typing in 50 different elbow sizes into the Revit family manually, the \`size_lookup\` function reads the necessary values from the CSV based on the pipe's Nominal Diameter.

**Syntax Format:**
\`result = size_lookup(LookupTableName, LookupColumn, DefaultIfNotFound, LookupValue1, ...)\`

*   **LookupTableName**: The name of the CSV file.
*   **LookupColumn**: The column header to return data from.
*   **DefaultIfNotFound**: The fallback value if the LookupValue isn't in the CSV.
*   **LookupValue1**: The dimension (e.g. Nominal Diameter) to search for in the first column.

<LookupSimulator />
    `
    },
    {
        id: "testing-zone",
        title: "12. Testing Zone",
        description: "An Interactive Playground to Test all Features",
        duration: "Interactive",
        icon: "CheckCircle",
        content: `
# Testing Zone

Welcome to the ultimate testing area! Use the interactive view below to experiment with all the geometries, parameters, lookups, and features we've covered in the previous modules.

<TestingZoneSimulator />
        `
    }
];
