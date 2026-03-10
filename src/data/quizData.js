export const quizData = [
    {
        id: 1,
        questionEn: "What is a 'Family' in Revit?",
        questionMy: "Revit တွင် 'Family' ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A group of people working on a project",
            "A standalone 3D modeling software",
            "A category of elements with common parameters and similar graphical representation",
            "A type of file extension in Windows"
        ],
        optionsMy: [
            "ပရောဂျက်တစ်ခုတွင် အလုပ်လုပ်နေသော လူစုလူဝေး",
            "သီးခြား 3D ပုံစံထုတ်သည့် ဆော့ဖ်ဝဲလ်တစ်ခု",
            "တူညီသော သတ်မှတ်ချက်များနှင့် ဆင်တူသော ပုံသဏ္ဍန်ရှိသည့် အစိတ်အပိုင်းများ အမျိုးအစား",
            "Windows ရှိ ဖိုင်အမျိုးအစားတစ်ခု"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 2,
        questionEn: "Which of the following is NOT a type of Revit Family?",
        questionMy: "အောက်ပါတို့မှ မည်သည့်အရာသည် Revit Family အမျိုးအစား မဟုတ်သနည်း?",
        optionsEn: ["System Family", "Loadable Family", "In-Place Family", "Dynamic Family"],
        optionsMy: ["စနစ် Family (System Family)", "ထည့်သွင်းနိုင်သော Family (Loadable Family)", "နေရာတွင်း Family (In-Place Family)", "တက်ကြွ Family (Dynamic Family)"],
        correctAnswerIndex: 3
    },
    {
        id: 3,
        questionEn: "What file extension is used for Revit Family files?",
        questionMy: "Revit Family ဖိုင်များအတွက် မည်သည့် ဖိုင်အမျိုးအစား လိုင်းခွဲ (extension) ကို အသုံးပြုသနည်း?",
        optionsEn: [".rvt", ".rfa", ".rte", ".rft"],
        optionsMy: [".rvt", ".rfa", ".rte", ".rft"],
        correctAnswerIndex: 1
    },
    {
        id: 4,
        questionEn: "Which tool is used to create a solid 3D shape by pushing a 2D profile forward?",
        questionMy: "2D ပုံစံကို ရှေ့သို့ တွန်းထုတ်ခြင်းဖြင့် အစိုင်အခဲ 3D ပုံသဏ္ဍာန် ဖန်တီးရန် မည်သည့် ကိရိယာကို အသုံးပြုသနည်း?",
        optionsEn: ["Blend", "Revolve", "Extrusion", "Sweep"],
        optionsMy: ["Blend", "Revolve", "Extrusion (ဆွဲထုတ်ခြင်း)", "Sweep"],
        correctAnswerIndex: 2
    },
    {
        id: 5,
        questionEn: "What is the purpose of Reference Planes in family creation?",
        questionMy: "Family ဖန်တီးရာတွင် Reference Plane များ၏ ရည်ရွယ်ချက်မှာ အဘယ်နည်း?",
        optionsEn: [
            "To add color to the model",
            "To act as a skeleton or framework to control geometry and parameters",
            "To export the family to AutoCAD",
            "To create shadow effects"
        ],
        optionsMy: [
            "မော်ဒယ်ကို အရောင်ထည့်ရန်",
            "ဂျီဩမေတြီနှင့် ကန့်သတ်ချက်များကို ထိန်းချုပ်ရန် အရိုးစု သို့မဟုတ် မူဘောင်အဖြစ် လုပ်ဆောင်ရန်",
            "Family ကို AutoCAD သို့ တင်ပို့ရန်",
            "အရိပ်များ ဖန်တီးရန်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 6,
        questionEn: "Which of these is used to define dimensions that can be changed by the user?",
        questionMy: "အသုံးပြုသူမှ ပြောင်းလဲနိုင်သော အတိုင်းအတာ (Dimensions) များကို သတ်မှတ်ရန် အောက်ပါတို့မှ မည်သည့်အရာကို အသုံးပြုသနည်း?",
        optionsEn: ["Static Text", "Symbolic Lines", "Parameters", "Detail Components"],
        optionsMy: ["ပုံသေ စာသား", "အမှတ်အသား လိုင်းများ", "Parameters (ကန့်သတ်ချက်များ)", "အသေးစိတ် အစိတ်အပိုင်းများ"],
        correctAnswerIndex: 2
    },
    {
        id: 7,
        questionEn: "What is a 'Type Parameter'?",
        questionMy: "'Type Parameter' ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A parameter that affects only a single instance of the family in the project",
            "A parameter that affects all instances of that specific family type in the project",
            "A text-only parameter",
            "A parameter used only for rendering"
        ],
        optionsMy: [
            "ပရောဂျက်ရှိ Family တစ်ခုတည်းကိုသာ သက်ရောက်မှုရှိသော ကန့်သတ်ချက်",
            "ပရောဂျက်ရှိ ထိုသီးခြား Family ပုံစံအားလုံးကို သက်ရောက်မှုရှိသော ကန့်သတ်ချက်",
            "စာသားသာ အသုံးပြုနိုင်သော ကန့်သတ်ချက်",
            "ပုံဖော်ခြင်း (Rendering) အတွက်သာ အသုံးပြုသော ကန့်သတ်ချက်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 8,
        questionEn: "What is an 'Instance Parameter'?",
        questionMy: "'Instance Parameter' ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A parameter that affects only the specific individual element selected",
            "A parameter that controls the materials of all families",
            "A parameter that defines the family's name",
            "A parameter used to connect pipes"
        ],
        optionsMy: [
            "ရွေးချယ်ထားသော သီးခြား အစိတ်အပိုင်းတစ်ခုတည်းကိုသာ သက်ရောက်မှုရှိသော ကန့်သတ်ချက်",
            "Family အားလုံး၏ ပစ္စည်းများကို ထိန်းချုပ်သော ကန့်သတ်ချက်",
            "Family ၏ အမည်ကို သတ်မှတ်သော ကန့်သတ်ချက်",
            "ပိုက်များကို ချိတ်ဆက်ရန် အသုံးပြုသော ကန့်သတ်ချက်"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 9,
        questionEn: "Which family template is best for creating a standard pump or AHU?",
        questionMy: "စံ Pump သို့မဟုတ် AHU ကို ဖန်တီးရန် မည်သည့် Family Template သည် အကောင်းဆုံးဖြစ်သနည်း?",
        optionsEn: [
            "Metric Generic Model.rft or Metric Mechanical Equipment.rft",
            "Metric Furniture.rft",
            "Metric Door.rft",
            "Metric Detail Item.rft"
        ],
        optionsMy: [
            "Metric Generic Model.rft သို့မဟုတ် Metric Mechanical Equipment.rft",
            "Metric Furniture.rft",
            "Metric Door.rft",
            "Metric Detail Item.rft"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 10,
        questionEn: "What tool allows a solid to follow a 2D path?",
        questionMy: "အစိုင်အခဲ တစ်ခုကို 2D လမ်းကြောင်းအတိုင်း လိုက်သွားစေရန် မည်သည့် ကိရိယာက လုပ်ဆောင်ပေးသနည်း?",
        optionsEn: ["Extrusion", "Sweep", "Blend", "Void Forms"],
        optionsMy: ["Extrusion", "Sweep", "Blend", "Void Forms (အလွတ် ပုံစံများ)"],
        correctAnswerIndex: 1
    },
    {
        id: 11,
        questionEn: "What is the function of a 'Void Form'?",
        questionMy: "'Void Form' ၏ လုပ်ဆောင်ချက်မှာ အဘယ်နည်း?",
        optionsEn: [
            "To add volume to a solid",
            "To apply paint to a surface",
            "To cut away or remove geometry from a Solid Form",
            "To create MEP connectors"
        ],
        optionsMy: [
            "အစိုင်အခဲ တစ်ခုသို့ ထုထည်ထည့်ရန်",
            "မျက်နှာပြင်ကို ဆေးသုတ်ရန်",
            "အစိုင်အခဲ ပုံစံမှ ဂျီဩမေတြီကို ဖြတ်တောက်ရန် သို့မဟုတ် ဖယ်ရှားရန်",
            "MEP Connectors များ ဖန်တီးရန်"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 12,
        questionEn: "To make a parameter control a dimension, you must do what to the dimension?",
        questionMy: "Parameter တစ်ခုသည် အတိုင်းအတာ (dimension) ကို ထိန်းချုပ်နိုင်စေရန် ထိုအတိုင်းအတာကို သင်ဘာလုပ်ရမည်နည်း?",
        optionsEn: ["Lock it", "Delete it", "Label it with a parameter", "Hide it in view"],
        optionsMy: ["လော့ခ်ချပါ", "ဖျက်ပါ", "၎င်းကို Parameter ဖြင့် တံဆိပ်တပ်ပါ (Label)", "မြင်ကွင်းတွင် ဖျောက်ထားပါ"],
        correctAnswerIndex: 2
    },
    {
        id: 13,
        questionEn: "What is nested family?",
        questionMy: "Nested family ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A family saved in a nest folder",
            "A family loaded into another family to become part of it",
            "A family exclusively used for plumbing",
            "A family that cannot be parameterized"
        ],
        optionsMy: [
            "Nest ဖိုဒါတွင် သိမ်းဆည်းထားသော Family",
            "အခြား Family တစ်ခုအတွင်းသို့ ထည့်သွင်းကာ ၎င်း၏ အစိတ်အပိုင်းတစ်ခု ဖြစ်လာသော Family",
            "ရေပိုက်အတွက်သာ သီးသန့်အသုံးပြုသော Family",
            "Parameters သတ်မှတ်၍မရသော Family"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 14,
        questionEn: "Which option allows a nested family parameter to be controlled by the host family?",
        questionMy: "Nested family ၏ Parameter တစ်ခုကို ပင်မ (host) family မှ ထိန်းချုပ်ခွင့်ပြုသော ရွေးချယ်မှုမှာ အဘယ်နည်း?",
        optionsEn: ["Linking parameters", "Locking dimensions", "Grouping elements", "Hiding elements"],
        optionsMy: ["Parameters များကို ချိတ်ဆက်ခြင်း (Linking)", "အတိုင်းအတာများကို လော့ခ်ချခြင်း", "အစိတ်အပိုင်းများကို အုပ်စုဖွဲ့ခြင်း", "အစိတ်အပိုင်းများကို ဖျောက်ထားခြင်း"],
        correctAnswerIndex: 0
    },
    {
        id: 15,
        questionEn: "If you want a dimension to remain exactly 150mm regardless of family size, you should:",
        questionMy: "Family ၏ အရွယ်အစား မည်သို့ပင်ရှိစေကာမူ အတိုင်းအတာ တစ်ခုကို 150mm အတိအကျ ကျန်ရှိစေလိုပါက သင်ဘာလုပ်သင့်သနည်း?",
        optionsEn: [
            "Create an instance parameter",
            "Lock the dimension",
            "Delete the reference planes",
            "Use a void extrusion"
        ],
        optionsMy: [
            "Instance Parameter တစ်ခု ဖန်တီးပါ",
            "အတိုင်းအတာကို လော့ခ်ချပါ (Lock)",
            "Reference plane များကို ဖျက်ပါ",
            "Void Extrusion ကို အသုံးပြုပါ"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 16,
        questionEn: "What is an MEP Connector?",
        questionMy: "MEP Connector ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A tool to join two pieces of furniture",
            "An element that allows MEP systems (Pipes, Ducts, Conduits) to logically connect and transfer data",
            "A parameter type for electrical voltage",
            "A file format for MEP projects"
        ],
        optionsMy: [
            "ပရိဘောဂ နှစ်ခုကို ဆက်ရန် ကိရိယာ",
            "MEP စနစ်များ (ပိုက်များ၊ ပြွန်များ၊ ကေဘယ်ကြိုးများ) ကို ယုတ္တိတန်စွာ ချိတ်ဆက်ပြီး ဒေတာများ လွှဲပြောင်းနိုင်စေမည့် အစိတ်အပိုင်း",
            "လျှပ်စစ်ဗို့အားအတွက် Parameter အမျိုးအစား",
            "MEP ပရောဂျက်များအတွက် ဖိုင်အမျိုးအစား"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 17,
        questionEn: "Where should MEP connectors ideally be placed?",
        questionMy: "MEP Connector များကို အကောင်းဆုံး ဘယ်နေရာမှာ ထားသင့်သနည်း?",
        optionsEn: [
            "Floating in the void to avoid intersections",
            "Directly on faces or work planes of the geometry where connections occur",
            "Only on the origin axes",
            "Outside the bounding box"
        ],
        optionsMy: [
            "ဖြတ်တောက်မှုများ မဖြစ်စေရန် အလွတ်နေရာတွင် လွင့်ပျံစေပါ",
            "ချိတ်ဆက်မှုများ ဖြစ်ပေါ်မည့် ဂျီဩမေတြီ၏ မျက်နှာပြင်များ သို့မဟုတ် အလုပ်လုပ်သည့် မျက်နှာပြင် (work planes) ပေါ်တွင် တိုက်ရိုက်",
            "မူလ ဝင်ရိုးများ (origin axes) ပေါ်တွင်သာ",
            "Bounding box ၏ အပြင်ဘက်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 18,
        questionEn: "Which parameter dictates what kind of system a Duct Connector can join?",
        questionMy: "Duct Connector တစ်ခုသည် မည်သည့် စနစ်အမျိုးအစားနှင့် ချိတ်ဆက်နိုင်သည်ကို မည်သည့် Parameter က သတ်မှတ်သနည်း?",
        optionsEn: ["Flow Configuration", "System Classification", "Connector Profile", "Loss Method"],
        optionsMy: ["စီးဆင်းမှု ဖွဲ့စည်းပုံ (Flow Configuration)", "စနစ် ခွဲခြားသတ်မှတ်ခြင်း (System Classification)", "Connector ရဲ့ ပုံသဏ္ဍာန် (Profile)", "ဆုံးရှုံးမှု နည်းလမ်း (Loss Method)"],
        correctAnswerIndex: 1
    },
    {
        id: 19,
        questionEn: "If a water pump needs IN and OUT connections, how many pipe connectors do you need?",
        questionMy: "ရေစုပ်စက် (Water Pump) တစ်ခုတွင် အဝင် (IN) နှင့် အထွက် (OUT) ချိတ်ဆက်မှုများ လိုအပ်ပါက၊ ပိုက် Connector မည်မျှ လိုအပ်သနည်း?",
        optionsEn: ["1", "2", "3", "0"],
        optionsMy: ["၁", "၂", "၃", "၀"],
        correctAnswerIndex: 1
    },
    {
        id: 20,
        questionEn: "A Pipe Connector's 'Flow Configuration' is set to 'Calculated'. What does this mean?",
        questionMy: "ပိုက် Connector တစ်ခု၏ 'Flow Configuration' ကို 'Calculated' အဖြစ် သတ်မှတ်ထားသည်။ ဤသည်မှာ ဘာကိုဆိုလိုသနည်း?",
        optionsEn: [
            "The flow value is locked and cannot interact",
            "The flow value is calculated by Revit based on downstream/upstream connected elements",
            "The user must guess the flow",
            "It turns off the flow completely"
        ],
        optionsMy: [
            "စီးဆင်းမှု တန်ဖိုးကို လော့ခ်ချထားပြီး အပြန်အလှန် သက်ရောက်မှု မရှိပါ",
            "အောက်ပိုင်း/အထက်ပိုင်း ချိတ်ဆက်ထားသော အစိတ်အပိုင်းများအပေါ် အခြေခံ၍ စီးဆင်းမှု တန်ဖိုးကို Revit မှ တွက်ချက်သည်",
            "အသုံးပြုသူက စီးဆင်းမှုကို ခန့်မှန်းရမည်",
            "စီးဆင်းမှုကို လုံးဝ ပိတ်လိုက်သည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 21,
        questionEn: "Which Connector allows linking directly to a surface without defining a specific coordinate rotation?",
        questionMy: "သတ်မှတ်ထားသော coordinate rotation ကို သတ်မှတ်ရန် မလိုဘဲ မျက်နှာပြင်တစ်ခုသို့ တိုက်ရိုက် ချိတ်ဆက်နိုင်စေသော Connector က කුමක්လဲ?",
        optionsEn: ["Face-based Connector", "Surface Connector", "Free Connector", "Work Plane Connector"],
        optionsMy: ["မျက်နှာပြင်ပေါ် အခြေခံထားသော Connector (Face-based)", "Surface Connector", "လွတ်လပ်သော Connector", "Work Plane Connector"],
        correctAnswerIndex: 0
    },
    {
        id: 22,
        questionEn: "What happens if a Family is created without any Reference Planes?",
        questionMy: "Reference Plane များလုံးဝမပါဘဲ Family တစ်ခုကို ဖန်တီးပါက ဘာဖြစ်မလဲ?",
        optionsEn: [
            "Revit will crash immediately",
            "The geometry will float around and cannot be parametricaly constrained easily",
            "It will become a System Family",
            "It will automatically generate reference planes"
        ],
        optionsMy: [
            "Revit ချက်ချင်း ရပ်တန့်သွားမည် (crash)",
            "ဂျီဩမေတြီသည် လွင့်ပျံနေမည်ဖြစ်ပြီး Parameters များဖြင့် လွယ်ကူစွာ ကန့်သတ်၍မရနိုင်ပါ",
            "၎င်းသည် System Family ဖြစ်လာမည်",
            "Reference plane များကို အလိုအလျောက် ဖန်တီးပေးမည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 23,
        questionEn: "What does the 'Is Reference' property of a Reference Plane do?",
        questionMy: "Reference Plane တစ်ခု၏ 'Is Reference' ဂုဏ်သတ္တိ (property) သည် ဘာလုပ်သနည်း?",
        optionsEn: [
            "Makes it invisible",
            "Determines its behavior when dimensioning and aligning instances in the project",
            "Changes its color",
            "Converts it to a model line"
        ],
        optionsMy: [
            "မမြင်ရအောင် လုပ်သည်",
            "ပရောဂျက်တွင် အတိုင်းအတာတိုင်းတာခြင်းနှင့် ညှိခြင်း (aligning) လုပ်သောအခါ ၎င်း၏ ပြုမူပုံကို သတ်မှတ်သည်",
            "၎င်း၏ အရောင်ကို ပြောင်းလဲသည်",
            "မော်ဒယ်လိုင်း (model line) အဖြစ် ပြောင်းလဲသည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 24,
        questionEn: "What is a 'Shared Parameter'?",
        questionMy: "'Shared Parameter' ဆိုသည်မှာ အဘယ်နည်း?",
        optionsEn: [
            "A parameter used in schedules and tags across multiple families and projects",
            "A parameter that shares its value with all other parameters automatically",
            "A network file sharing system",
            "A parameter created by AutoCAD"
        ],
        optionsMy: [
            "Family မျိုးစုံနှင့် ပရောဂျက်များတစ်လျှောက် အချိန်ဇယားများ (Schedules) နှင့် Tags များတွင် အသုံးပြုရန် ကန့်သတ်ချက်",
            "အခြား Parameters အားလုံးနှင့် ၎င်း၏ တန်ဖိုးကို အလိုအလျောက် မျှဝေပေးသော ကန့်သတ်ချက်",
            "ကွန်ရက် ဖိုင်မျှဝေသည့် စနစ်",
            "AutoCAD မှ ဖန်တီးထားသော ကန့်သတ်ချက်"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 25,
        questionEn: "Where do Shared Parameters live?",
        questionMy: "Shared Parameters များသည် မည်သည့်နေရာတွင် ရှိသနည်း?",
        optionsEn: [
            "Inside the family file only",
            "Inside a separate external .txt file",
            "Inside the Windows Registry",
            "In the Revit memory cache"
        ],
        optionsMy: [
            "Family ဖိုင်အတွင်းမှာသာ",
            "သီးခြား ပြင်ပ .txt ဖိုင်အတွင်း",
            "Windows Registry အတွင်း",
            "Revit ၏ memory cache အတွင်း"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 26,
        questionEn: "How do you control Visibility of different geometry parts (e.g., showing high details vs low details)?",
        questionMy: "မတူညီသော ဂျီဩမေတြီ အစိတ်အပိုင်းများ၏ မြင်နိုင်စွမ်းကို မည်သို့ ထိန်းချုပ်မည်နည်း (ဥပမာ- မြင့်မားသော အသေးစိတ် အချက်အလက်များ ပြသခြင်းနှင့် အနိမ့်ဆုံး အသေးစိတ်များကို ပြသခြင်း)?",
        optionsEn: [
            "Delete them when not needed",
            "Use the 'Visibility/Graphics Overrides' button on the geometry's properties",
            "Change the material color to transparent",
            "Use void forms"
        ],
        optionsMy: [
            "မလိုအပ်ပါက ဖျက်ပစ်ပါ",
            "ဂျီဩမေတြီ၏ ဂုဏ်သတ္တိများရှိ 'Visibility/Graphics Overrides' ခလုတ်ကို အသုံးပြုပါ",
            "Material အရောင်ကို အကြည်ရောင် ပြောင်းပါ",
            "Void forms များကို အသုံးပြုပါ"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 27,
        questionEn: "True or False: A Formula parameter can be used to automatically calculate an Air Terminal's size based on Airflow.",
        questionMy: "အမှန် သို့မဟုတ် အမှား: လေဝင်လေထွက် ပမာဏ (Airflow) အပေါ် အခြေခံ၍ လေဝင်ပေါက် (Air Terminal) ၏ အရွယ်အစားကို အလိုအလျောက် တွက်ချက်ရန် Formula Parameter ကို အသုံးပြုနိုင်သည်။",
        optionsEn: ["True", "False", "-", "-"],
        optionsMy: ["အမှန်", "အမှား", "-", "-"],
        correctAnswerIndex: 0
    },
    {
        id: 28,
        questionEn: "What formula operator is used for Multiplication?",
        questionMy: "အမြှောက်တွက်ချက်ရန် မည်သည့် သင်္ကေတကို အသုံးပြုသနည်း?",
        optionsEn: ["+", "-", "/", "*"],
        optionsMy: ["+", "-", "/", "*"],
        correctAnswerIndex: 3
    },
    {
        id: 29,
        questionEn: "Which property allows a family to automatically cut a hole in a host wall?",
        questionMy: "Family တစ်ခုသည် ပင်မနံရံ (host wall) တစ်ခုတွင် အလိုအလျောက် အပေါက်ငယ်တစ်ခု ဖောက်နိုင်စေရန် မည်သည့် ဂုဏ်သတ္တိက ခွင့်ပြုသနည်း?",
        optionsEn: [
            "Cut with Voids When Loaded",
            "Make Transparent",
            "Always Vertical",
            "Shared"
        ],
        optionsMy: [
            "Cut with Voids When Loaded (ထည့်သွင်းသောအခါ အပေါက်ဖောက်ပါ)",
            "Make Transparent (အကြည်ရောင် လုပ်ပါ)",
            "Always Vertical (အမြဲတမ်း ဒေါင်လိုက်)",
            "Shared (မျှဝေထားသည်)"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 30,
        questionEn: "What is an 'Always Vertical' parameter inside Family Category and Parameters?",
        questionMy: "Family Category နှင့် Parameters များအတွင်းရှိ 'Always Vertical' Parameter သည် အဘယ်နည်း?",
        optionsEn: [
            "Forces geometry to never rotate, keeping it strictly upright even if the host changes angle",
            "Eliminates horizontal lines",
            "Turns the family into a column",
            "Deletes the x-axis"
        ],
        optionsMy: [
            "ပင်မ (host) က ထောင့်ပြောင်းသွားသော်လည်း ဂျီဩမေတြီကို ဘယ်တော့မှ မလည်ပတ်စေဘဲ မတ်မတ်နေရန် အတင်းအကျပ် ခိုင်းစေသည်",
            "အလျားလိုက် မျဉ်းများကို ဖယ်ရှားသည်",
            "Family ကို တိုင် (column) အဖြစ် ပြောင်းလဲသည်",
            "X ဝင်ရိုးကို ဖျက်ပစ်သည်"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 31,
        questionEn: "What does the 'Work Plane-Based' parameter do?",
        questionMy: "'Work Plane-Based' Parameter သည် ဘာလုပ်သနည်း?",
        optionsEn: [
            "Allows the family to only be placed on level 1",
            "Forces the family to be hosted by a specific work plane instead of a solid face",
            "Makes the family flat",
            "Removes 3D geometry"
        ],
        optionsMy: [
            "Family များကို level 1 တွင်သာ ထားရှိခွင့်ပြုသည်",
            "Family ကို အစိုင်အခဲ မျက်နှာပြင် အစား သတ်မှတ်ထားသော Work Plane ပေါ်တွင် ထားရှိရန် အတင်းအကျပ် ခိုင်းစေသည်",
            "Family ကို ပြန့်ပြူးစေသည်",
            "3D ဂျီဩမေတြီ ကို ဖယ်ရှားသည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 32,
        questionEn: "If calculating Area (Width * Length), the resulting parameter Type must be:",
        questionMy: "ဧရိယာ (အကျယ် * အလျား) ကို တွက်ချက်လျှင် ထွက်လာမည့် Parameter အမျိုးအစားသည် အဘယ်အရာ ဖြစ်ရမည်နည်း?",
        optionsEn: ["Length", "Area", "Volume", "Text"],
        optionsMy: ["အလျား (Length)", "ဧရိယာ (Area)", "ထုထည် (Volume)", "စာသား (Text)"],
        correctAnswerIndex: 1
    },
    {
        id: 33,
        questionEn: "In formulas, what happens if you add 'Length' to 'Text'?",
        questionMy: "ပုံသေနည်းများ (formulas) တွင်၊ သင်သည် 'Length' နှင့် 'Text' ကို ပေါင်းလျှင် ဘာဖြစ်မည်နည်း?",
        optionsEn: [
            "It creates a descriptive sentence",
            "Revit returns an 'Inconsistent Units' error",
            "It works perfectly",
            "It automatically converts text to numbers"
        ],
        optionsMy: [
            "ဖော်ပြချက် ဝါကျတစ်ခုကို ဖန်တီးပေးသည်",
            "Revit သည် 'Inconsistent Units' (ယူနစ်များ ကိုက်ညီမှုမရှိခြင်း) အမှားကို ပြသမည်",
            "အပြည့်အဝ အလုပ်လုပ်သည်",
            "စာသားကို ဂဏန်းများအဖြစ် အလိုအလျောက် ပြောင်းလဲပေးသည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 34,
        questionEn: "What is an 'IF' statement used for in family formulas?",
        questionMy: "Family ဖော်မြူလာများတွင် 'IF' statement ကို မည်သည့်အတွက် အသုံးပြုသနည်း?",
        optionsEn: [
            "To delete unwanted parameters",
            "To create conditional logic (e.g., if Width > 1000, value A, otherwise value B)",
            "To import families",
            "To connect pipes"
        ],
        optionsMy: [
            "မလိုအပ်သော Parameters များကို ဖျက်ရန်",
            "အခြေအနေအရ ယုတ္တိတန်သော အလုပ်များ ဖန်တီးရန် (ဥပမာ- Width > 1000 ဖြစ်လျှင် တန်ဖိုး A၊ သို့မဟုတ်ပါက တန်ဖိုး B)",
            "Families များကို တင်သွင်းရန်",
            "ပိုက်များ ချိတ်ဆက်ရန်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 35,
        questionEn: "What tool allows drawing a 2D sequence of lines representing symbols in Floor Plans?",
        questionMy: "ကြမ်းပြင် အစီအစဉ်များ (Floor Plans) တွင် သင်္ကေတများကို ကိုယ်စားပြုသော 2D မျဉ်းကြောင်းများကို ရေးဆွဲရန် မည်သည့် ကိရိယာက ခွင့်ပြုသနည်း?",
        optionsEn: ["Model Lines", "Symbolic Lines", "Extrusion", "Sweep"],
        optionsMy: ["Model Lines (မော်ဒယ် မျဉ်းများ)", "Symbolic Lines (အမှတ်အသား မျဉ်းများ)", "Extrusion", "Sweep"],
        correctAnswerIndex: 1
    },
    {
        id: 36,
        questionEn: "What is the difference between Model Lines and Symbolic Lines?",
        questionMy: "Model Lines နှင့် Symbolic Lines များကြား ကွာခြားချက်မှာ အဘယ်နည်း?",
        optionsEn: [
            "Model Lines are visible in 3D; Symbolic Lines are visible only in parallel 2D views",
            "Symbolic Lines are 3D; Model Lines are 2D",
            "Model lines are only for MEP",
            "There is no difference"
        ],
        optionsMy: [
            "Model Lines များကို 3D တွင် မြင်နိုင်သည်။ Symbolic Lines များကို အပြိုင် 2D မြင်ကွင်းများတွင်သာ မြင်နိုင်သည်",
            "Symbolic Lines များသည် 3D ဖြစ်သည်။ Model Lines များသည် 2D ဖြစ်သည်",
            "Model lines များသည် MEP အတွက်သာဖြစ်သည်",
            "ကွာခြားချက် မရှိပါ"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 37,
        questionEn: "Can a Reference Plane be named?",
        questionMy: "Reference Plane ကို အမည်ပေးနိုင်ပါသလား?",
        optionsEn: ["Yes", "No", "-", "-"],
        optionsMy: ["ပေးနိုင်သည်", "မပေးနိုင်ပါ", "-", "-"],
        correctAnswerIndex: 0
    },
    {
        id: 38,
        questionEn: "Why is naming a Reference Plane important?",
        questionMy: "Reference Plane ကို အမည်ပေးခြင်းသည် အဘယ်ကြောင့် အရေးကြီးသနည်း?",
        optionsEn: [
            "Because Revit prohibits unnamed planes",
            "It turns it into an active Work Plane that you can select and draw on",
            "It changes its color",
            "It allows rendering to see it"
        ],
        optionsMy: [
            "Revit သည် အမည်မပါသော plane များကို တားမြစ်ထားသောကြောင့်",
            "၎င်းသည် သင်ရွေးချယ်ပြီး ဆွဲနိုင်သော ပုံသေ Work Plane (အလုပ်မျက်နှာပြင်) အဖြစ်သို့ ပြောင်းလဲပေးသောကြောင့်",
            "၎င်း၏ အရောင်ကို ပြောင်းလဲပေးသည်",
            "ပုံဖော်ခြင်း (rendering) လုပ်ရာတွင် မြင်တွေ့ခွင့် ပြုသည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 39,
        questionEn: "What feature in the family editor checks how the geometry responds to parameter changes before loading into a project?",
        questionMy: "ရောဂျက်ထဲသို့ မတင်မီ geometry သည် parameter အပြောင်းအလဲများကို မည်သို့ တုံ့ပြန်သည်ကို စစ်ဆေးပေးသော Family Editor အတွင်းရှိ လုပ်ဆောင်ချက်မှာ အဘယ်နည်း?",
        optionsEn: ["Flexing", "Testing", "Breaking", "Bending"],
        optionsMy: ["Flexing (ကွေးညွှတ်ခြင်း / စမ်းသပ်ခြင်း)", "Testing (စမ်းသပ်ခြင်း)", "Breaking (ချိုးဖြတ်ခြင်း)", "Bending (ကွေးခြင်း)"],
        correctAnswerIndex: 0
    },
    {
        id: 40,
        questionEn: "Regarding MEP constraints, constraints should primarily be made to what?",
        questionMy: "MEP ကန့်သတ်ချက်များ (constraints) နှင့် ပတ်သက်၍၊ ကန့်သတ်ချက်များကို အဓိကအားဖြင့် မည်သည့်အရာတွင် ပြုလုပ်သင့်သနည်း?",
        optionsEn: [
            "Face of solids",
            "Other dimensions",
            "Reference Planes",
            "MEP Connectors"
        ],
        optionsMy: [
            "အစိုင်အခဲများ၏ မျက်နှာပြင်",
            "အခြား အတိုင်းအတာများ",
            "Reference Planes",
            "MEP Connectors"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 41,
        questionEn: "Where do you define the OmniClass Number for an element?",
        questionMy: "အစိတ်အပိုင်းတစ်ခုအတွက် OmniClass နံပါတ်ကို မည်သည့်နေရာတွင် သတ်မှတ်သနည်း?",
        optionsEn: ["Family Types Dialog", "Family Category and Parameters", "Project Settings", "Materials Manager"],
        optionsMy: ["Family Types Dialog တွင်", "Family Category နှင့် Parameters များတွင်", "Project Settings တွင်", "Materials Manager တွင်"],
        correctAnswerIndex: 1
    },
    {
        id: 42,
        questionEn: "What does 'Linking Parameters' mean for MEP Connectors?",
        questionMy: "MEP Connectors များအတွက် 'Linking Parameters' ဆိုသည်မှာ အဘယ်အရာကို ဆိုလိုသနည်း?",
        optionsEn: [
            "Joining two projects together",
            "Assigning a connector's inherent parameters (like Flow or Diameter) to a global Family Parameter",
            "Connecting pipes visually",
            "Creating shared coordinates"
        ],
        optionsMy: [
            "ပရောဂျက် နှစ်ခုကို ပေါင်းခြင်း",
            "Connector ၏ ပင်ကို Parameters များ (Flow သို့မဟုတ် Diameter ကဲ့သို့) ကို အထွေထွေ Family Parameter တစ်ခုသို့ အစားထိုး သတ်မှတ်ခြင်း",
            "ပိုက်များကို အမြင်အရ ချိတ်ဆက်ခြင်း",
            "မျှဝေထားသော တည်နေရာများ (shared coordinates) ဖန်တီးခြင်း"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 43,
        questionEn: "If a Duct Connector uses 'Preset' Flow Configuration, the flow value must be entered by whom/what?",
        questionMy: "Duct Connector တစ်ခုသည် 'Preset' Flow Configuration ကို အသုံးပြုပါက၊ Flow ပမာဏကို မည်သူ/မည်သည့်အရာမှ ထည့်သွင်းရမည်နည်း?",
        optionsEn: ["Revit automatically calculates it", "The User via parameters", "The Manufacturer", "The Architect"],
        optionsMy: ["Revit မှ အလိုအလျောက် တွက်ချက်သည်", "Parameters များမှတဆင့် အသုံးပြုသူက (The User)", "ထုတ်လုပ်သူ", "ဗိသုကာ"],
        correctAnswerIndex: 1
    },
    {
        id: 44,
        questionEn: "Which element establishes the precise starting coordinate (0,0,0) of the family?",
        questionMy: "amily ၏ တိကျသော စတင်ရာ တည်နေရာ (0,0,0) ကို မည်သည့် အစိတ်အပိုင်းက သတ်မှတ်သနည်း?",
        optionsEn: [
            "The Origin point of intersecting Reference Planes checked as 'Defines Origin'",
            "The top left corner of the geometry",
            "The center point of the bottom solid",
            "The first connector placed"
        ],
        optionsMy: [
            "'Defines Origin' အဖြစ် အမှတ်ခြစ်ထားသော Reference Planes များ ကြက်ခြေခတ် ဖြတ်သွားသည့် မိခင်အမှတ် (Origin point)",
            "ဂျီဩမေတြီ၏ ညာဘက်အပေါ် ထောင့်",
            "အောက်ခြေ အစိုင်အခဲ၏ အလယ်မှတ်",
            "ပထမဆုံး ထားရှိထားသော connector"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 45,
        questionEn: "Can you change the Category of a family after creating it?",
        questionMy: "Family ဖန်တီးပြီးနောက် ၎င်း၏ အမျိုးအစား (Category) ကို ပြောင်းလဲနိုင်ပါသလား?",
        optionsEn: [
            "No, it is permanently locked",
            "Yes, via the Family Category and Parameters button",
            "Only if it contains no geometry",
            "Only using a third-party plugin"
        ],
        optionsMy: [
            "မရပါ၊ အမြဲတမ်း လော့ခ်ချထားသည်",
            "ရပါသည်၊ Family Category နှင့် Parameters ခလုတ်ကို အသုံးပြု၍",
            "ဂျီဩမေတြီ မပါရှိမှသာ ပြောင်းနိုင်သည်",
            "Third-party plugin အသုံးပြုမှသာ ပြောင်းနိုင်သည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 46,
        questionEn: "Which statement is true for Arraying geometries in Family Editor?",
        questionMy: "Family Editor တွင် ဂျီဩမေတြီများကို Array (အစဉ်လိုက် ပွားခြင်း) လုပ်ခြင်းအတွက် မည်သည့်အချက် မှန်ကန်သနည်း?",
        optionsEn: [
            "Arrays cannot be parameterized",
            "You can parameterize the number of array elements using an Integer parameter",
            "Arrays can only be circular",
            "Arrays immediately turn into nested families"
        ],
        optionsMy: [
            "Array များကို Parameters သတ်မှတ်၍မရပါ",
            "Integer parameter တစ်ခုကို အသုံးပြု၍ အစဉ်လိုက် အရေအတွက်ကို Parameters သတ်မှတ်နိုင်သည်။",
            "Array များကို အဝိုင်းပုံစံသာ လုပ်နိုင်သည်",
            "Array များသည် nested families အဖြစ် ချက်ချင်း ပြောင်းလဲသွားသည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 47,
        questionEn: "When using the 'Blend' tool, how many profiles do you sketch?",
        questionMy: "'Blend' ကိရိယာကို အသုံးပြုရာတွင်၊ သင် ပုံကြမ်းများ (profiles) မည်မျှ ရေးဆွဲရသနည်း?",
        optionsEn: ["One", "Two (a Top and a Bottom)", "Three", "Four"],
        optionsMy: ["တစ်ခု", "နှစ်ခု (ထိပ်ပိုင်းတစ်ခု နှင့် အောက်ခြေတစ်ခု)", "သုံးခု", "လေးခု"],
        correctAnswerIndex: 1
    },
    {
        id: 48,
        questionEn: "What happens to elements when you change the Detail Level in the bottom bar?",
        questionMy: "အောက်ဘက် ဘား (bottom bar) တွင် အသေးစိတ် အဆင့် (Detail Level) ကို ပြောင်းလဲလိုက်သောအခါ အစိတ်အပိုင်းများကို ဘာဖြစ်သွားသနည်း?",
        optionsEn: [
            "Nothing happens",
            "The family visibility settings determine which geometries or lines display based on Coarse, Medium, or Fine",
            "The family is exported to AutoCAD",
            "All dimensions are deleted"
        ],
        optionsMy: [
            "ဘာမှမဖြစ်ပါ",
            "Coarse, Medium, သို့မဟုတ် Fine အခြေအနေများအပေါ် မူတည်၍ မည်သည့် ဂျီဩမေတြီ သို့မဟုတ် မျဉ်းများကို ပြသမည်ကို မိသားစု မြင်နိုင်စွမ်း သတ်မှတ်ချက်များ (visibility settings) က ဆုံးဖြတ်သည်",
            "Family ကို AutoCAD သို့ တင်ပို့လိုက်သည်",
            "အတိုင်းအတာများအားလုံး ဖျက်ပစ်လိုက်သည်"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 49,
        questionEn: "What parameter type is 'Tick Box' formatting?",
        questionMy: "'အမှန်ခြစ်ရန် အကွက်' (Tick Box) ပုံစံသည် မည်သည့် Parameter အမျိုးအစားဖြစ်သနည်း?",
        optionsEn: ["Text", "Number", "Yes/No", "Material"],
        optionsMy: ["စာသား (Text)", "နံပါတ် (Number)", "ဟုတ်သည်/မဟုတ်ပါ (Yes/No)", "ပစ္စည်း (Material)"],
        correctAnswerIndex: 2
    },
    {
        id: 50,
        questionEn: "Why should you use 'Reference Lines' instead of 'Reference Planes' for angular parameters?",
        questionMy: "ထောင့် Parameters များအတွက် 'Reference Planes' အစား 'Reference Lines' ကို အဘယ်ကြောင့် အသုံးပြုသင့်သနည်း?",
        optionsEn: [
            "Because planes cannot rotate well around a fixed point without breaking constraints",
            "Because lines have color and planes do not",
            "Reference Lines are longer",
            "Reference Lines are 3D"
        ],
        optionsMy: [
            "အဘယ်ကြောင့်ဆိုသော် Planes များသည် လော့ခ်ချထားသော ကန့်သတ်ချက်များ (constraints) ကို မပျက်စီးဘဲ သတ်မှတ်ထားသော အမှတ်တစ်ခု ပတ်လည်တွင် ကောင်းစွာ မလှည့်ပတ်နိုင်သောကြောင့် ဖြစ်သည်။",
            "အဘယ်ကြောင့်ဆိုသော် မျဉ်းများတွင် အရောင်ရှိပြီး planes များတွင် မရှိသောကြောင့် ဖြစ်သည်",
            "Reference Lines များက ပိုရှည်သည်",
            "Reference Lines များသည် 3D ဖြစ်သည်"
        ],
        correctAnswerIndex: 0
    }
];
