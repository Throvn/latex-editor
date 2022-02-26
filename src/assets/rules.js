const suggestions = Object.values({
  item: {
    prefix: "item",
    body: "\n\\item ",
    description: "\\item on a newline",
  },
  subscript: {
    prefix: "__",
    body: "_{${1:${TM_SELECTED_TEXT}}}",
    description: "subscript",
  },
  superscript: {
    prefix: "**",
    body: "^{${1:${TM_SELECTED_TEXT}}}",
    description: "superscript",
  },
  etc: {
    prefix: "...",
    body: "\\dots",
    description: "\\dots",
  },
  cdot: {
    prefix: "@.",
    body: "\\cdot",
    description: "\\cdot",
  },
  infinity: {
    prefix: "@8",
    body: "\\infty",
    description: "infinity symbol",
  },
  partial: {
    prefix: "@6",
    body: "\\partial",
    description: "partial derivative symbol",
  },
  fraction: {
    prefix: "@/",
    body: "\\frac{$1}{$2}$0",
    description: "fraction",
  },
  fraction2: {
    prefix: "@%",
    body: "\\frac{$1}{$2}$0",
    description: "fraction",
  },
  hat: {
    prefix: "@^",
    body: "\\hat{${1:${TM_SELECTED_TEXT}}}$0",
    description: "hat",
  },
  bar: {
    prefix: "@_",
    body: "\\bar{${1:${TM_SELECTED_TEXT}}}$0",
    description: "bar",
  },
  circ: {
    prefix: "@@",
    body: "\\circ",
    description: "circ",
  },
  supcirc: {
    prefix: "@0",
    body: "^\\circ",
    description: "superscript circ",
  },
  dot: {
    prefix: "@;",
    body: "\\dot{${1:${TM_SELECTED_TEXT}}}$0",
    description: "dot",
  },
  ddot: {
    prefix: "@:",
    body: "\\ddot{${1:${TM_SELECTED_TEXT}}}$0",
    description: "ddot",
  },

  equiv: {
    prefix: "@=",
    body: "\\equiv",
    description: "equiv symbol",
  },
  times: {
    prefix: "@*",
    body: "\\times",
    description: "times symbol",
  },
  leq: {
    prefix: "@<",
    body: "\\leq",
    description: "leq symbol",
  },
  geq: {
    prefix: "@>",
    body: "\\geq",
    description: "geq symbol",
  },
  sqrt: {
    prefix: "@2",
    body: "\\sqrt{${1:${TM_SELECTED_TEXT}}}$0",
    description: "sqrt command",
  },
  int: {
    prefix: "@I",
    body: "\\int_{$1}^{$2}$0",
    description: "integral",
  },
  BigStroke: {
    prefix: "@|",
    body: "\\Big|",
    description: "Big |",
  },
  bigcup: {
    prefix: "@+",
    body: "\\bigcup",
    description: "bigcup",
  },
  bigcap: {
    prefix: "@-",
    body: "\\bigcap",
    description: "bigcap",
  },
  nonumber: {
    prefix: "@,",
    body: "\\nonumber",
    description: "nonumber",
  },
  equation: {
    prefix: "BEQ",
    body: "\\begin{equation}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{equation}",
    description: "equation environment",
  },
  equationStar: {
    prefix: "BSEQ",
    body: "\\begin{equation*}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{equation*}",
    description: "equation* environment",
  },
  align: {
    prefix: "BAL",
    body: "\\begin{align}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{align}",
    description: "align environment",
  },
  alignStar: {
    prefix: "BSAL",
    body: "\\begin{align*}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{align*}",
    description: "align* environment",
  },
  gather: {
    prefix: "BGA",
    body: "\\begin{gather}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{gather}",
    description: "gather environment",
  },
  "gather*": {
    prefix: "BSGA",
    body: "\\begin{gather*}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{gather*}",
    description: "gather* environment",
  },
  multline: {
    prefix: "BMU",
    body: "\\begin{multline}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{multline}",
    description: "multline environment",
  },
  "multline*": {
    prefix: "BSMU",
    body: "\\begin{multline*}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{multline*}",
    description: "multline* environment",
  },
  itemize: {
    prefix: "BIT",
    body: "\\begin{itemize}\n\t\\item ${0:${TM_SELECTED_TEXT}}\n\\end{itemize}",
    description: "itemize environment",
  },
  enumerate: {
    prefix: "BEN",
    body: "\\begin{enumerate}\n\t\\item ${0:${TM_SELECTED_TEXT}}\n\\end{enumerate}",
    description: "enumerate environment",
  },
  split: {
    prefix: "BSPL",
    body: "\\begin{split}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{split}",
    description: "split environment",
  },
  cases: {
    prefix: "BCAS",
    body: "\\begin{cases}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{cases}",
    description: "cases environment",
  },
  frame: {
    prefix: "BFR",
    body: "\\begin{frame}\n\t\\frametitle{${1:<title>}}\n\n\t${0:${TM_SELECTED_TEXT}}\n\n\\end{frame}",
    description: "frame",
  },
  figure: {
    prefix: "BFI",
    body: "\\begin{figure}[${1:htbp}]\n\t\\centering\n\t${0:${TM_SELECTED_TEXT}}\n\t\\caption{${2:<caption>}}\n\t\\label{${3:<label>}}\n\\end{figure}",
    description: "figure",
  },
  table: {
    prefix: "BTA",
    body: "\\begin{table}[${1:htbp}]\n\t\\centering\\begin{tabular}{${4:<columns>}}\n\t\t${0:${TM_SELECTED_TEXT}}\n\t\\end{tabular}\n\t\\caption{${2:<caption>}}\n\t\\label{${3:<label>}}\n\\end{table}",
    description: "table",
  },
  tikzpicture: {
    prefix: "BTP",
    body: "\\begin{tikzpicture}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{tikzpicture}",
    description: "tikzpicture",
  },
  "set font size": {
    prefix: "fontsize",
    body: "${1|\\Huge,\\huge,\\LARGE,\\Large,\\large,\\normalsize,\\small,\\footnotesize,\\scriptsize,\\tiny|}",
    description: "Select a font size",
  },
  textnormal: {
    prefix: "FNO",
    body: "\\textnormal{${1:${TM_SELECTED_TEXT:text}}}",
    description: "normal font",
  },
  textrm: {
    prefix: "FRM",
    body: "\\textrm{${1:${TM_SELECTED_TEXT:text}}}",
    description: "roman font",
  },
  emph: {
    prefix: "FEM",
    body: "\\emph{${1:${TM_SELECTED_TEXT:text}}}",
    description: "emphasis font",
  },
  textsf: {
    prefix: "FSF",
    body: "\\textsf{${1:${TM_SELECTED_TEXT:text}}}",
    description: "sans serif font",
  },
  texttt: {
    prefix: "FTT",
    body: "\\texttt{${1:${TM_SELECTED_TEXT:text}}}",
    description: "typewriter font",
  },
  textit: {
    prefix: "FIT",
    body: "\\textit{${1:${TM_SELECTED_TEXT:text}}}",
    description: "italic font",
  },
  textsl: {
    prefix: "FSL",
    body: "\\textsl{${1:${TM_SELECTED_TEXT:text}}}",
    description: "slanted font",
  },
  textsc: {
    prefix: "FSC",
    body: "\\textsc{${1:${TM_SELECTED_TEXT:text}}}",
    description: "smallcaps font",
  },
  underline: {
    prefix: "FUL",
    body: "\\underline{${1:${TM_SELECTED_TEXT:text}}}",
    description: "Underline text",
  },
  uppercase: {
    prefix: "FUC",
    body: "\\uppercase{${1:${TM_SELECTED_TEXT:text}}}",
    description: "Make text uppercase (all caps)",
  },
  lowercase: {
    prefix: "FLC",
    body: "\\lowercase{${1:${TM_SELECTED_TEXT:text}}}",
    description: "Make text lowercase (no caps)",
  },
  textbf: {
    prefix: "FBF",
    body: "\\textbf{${1:${TM_SELECTED_TEXT:text}}}",
    description: "bold font",
  },
  textsuperscript: {
    prefix: "FSS",
    body: "\\textsuperscript{${1:${TM_SELECTED_TEXT:text}}}",
    description: "Make text a superscript",
  },
  textsubscript: {
    prefix: "FBS",
    body: "\\textsubscript{${1:${TM_SELECTED_TEXT:text}}}",
    description: "Make text a superscript",
  },
  mathrm: {
    prefix: "MRM",
    body: "\\mathrm{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math roman font",
  },
  mathbf: {
    prefix: "MBF",
    body: "\\mathbf{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math bold font",
  },
  mathbb: {
    prefix: "MBB",
    body: "\\mathbb{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math blackboard bold font",
  },
  mathcal: {
    prefix: "MCA",
    body: "\\mathcal{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math caligraphic font",
  },
  mathit: {
    prefix: "MIT",
    body: "\\mathit{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math italic font",
  },
  mathtt: {
    prefix: "MTT",
    body: "\\mathtt{${1:${TM_SELECTED_TEXT:text}}}",
    description: "math typewriter font",
  },
  alpha: {
    prefix: "@a",
    body: "\\alpha",
    description: "alpha",
  },
  beta: {
    prefix: "@b",
    body: "\\beta",
    description: "beta",
  },
  chi: {
    prefix: "@c",
    body: "\\chi",
    description: "chi",
  },
  delta: {
    prefix: "@d",
    body: "\\delta",
    description: "delta",
  },
  epsilon: {
    prefix: "@e",
    body: "\\epsilon",
    description: "epsilon",
  },
  varepsilon: {
    prefix: "@ve",
    body: "\\varepsilon",
    description: "varepsilon",
  },
  phi: {
    prefix: "@f",
    body: "\\phi",
    description: "phi",
  },
  varphi: {
    prefix: "@vf",
    body: "\\varphi",
    description: "varphi",
  },
  gamma: {
    prefix: "@g",
    body: "\\gamma",
    description: "gamma",
  },
  eta: {
    prefix: "@h",
    body: "\\eta",
    description: "eta",
  },
  iota: {
    prefix: "@i",
    body: "\\iota",
    description: "iota",
  },
  kappa: {
    prefix: "@k",
    body: "\\kappa",
    description: "kappa",
  },
  lambda: {
    prefix: "@l",
    body: "\\lambda",
    description: "lambda",
  },
  mu: {
    prefix: "@m",
    body: "\\mu",
    description: "mu",
  },
  nu: {
    prefix: "@n",
    body: "\\nu",
    description: "nu",
  },
  pi: {
    prefix: "@p",
    body: "\\pi",
    description: "pi",
  },
  theta: {
    prefix: "@q",
    body: "\\theta",
    description: "theta",
  },
  vartheta: {
    prefix: "@vq",
    body: "\\vartheta",
    description: "vartheta",
  },
  rho: {
    prefix: "@r",
    body: "\\rho",
    description: "rho",
  },
  sigma: {
    prefix: "@s",
    body: "\\sigma",
    description: "sigma",
  },
  varsigma: {
    prefix: "@vs",
    body: "\\varsigma",
    description: "varsigma",
  },
  tau: {
    prefix: "@t",
    body: "\\tau",
    description: "tau",
  },
  upsilon: {
    prefix: "@u",
    body: "\\upsilon",
    description: "upsilon",
  },
  omega: {
    prefix: "@o",
    body: "\\omega",
    description: "omega",
  },
  wedge: {
    prefix: "@&",
    body: "\\wedge",
    description: "wedge",
  },
  xi: {
    prefix: "@x",
    body: "\\xi",
    description: "xi",
  },
  psi: {
    prefix: "@y",
    body: "\\psi",
    description: "psi",
  },
  zeta: {
    prefix: "@z",
    body: "\\zeta",
    description: "zeta",
  },
  Delta: {
    prefix: "@D",
    body: "\\Delta",
    description: "Delta",
  },
  Phi: {
    prefix: "@F",
    body: "\\Phi",
    description: "Phi",
  },
  Gamma: {
    prefix: "@G",
    body: "\\Gamma",
    description: "Gamma",
  },
  Theta: {
    prefix: "@Q",
    body: "\\Theta",
    description: "Theta",
  },
  Lambda: {
    prefix: "@L",
    body: "\\Lambda",
    description: "Lambda",
  },
  Xi: {
    prefix: "@X",
    body: "\\Xi",
    description: "Xi",
  },
  Psi: {
    prefix: "@Y",
    body: "\\Psi",
    description: "Psi",
  },
  Sigma: {
    prefix: "@S",
    body: "\\Sigma",
    description: "Sigma",
  },
  Upsilon: {
    prefix: "@U",
    body: "\\Upsilon",
    description: "Upsilon",
  },
  Omega: {
    prefix: "@W",
    body: "\\Omega",
    description: "Omega",
  },
  bracketl: {
    prefix: "@(",
    body: "\\left( ${1:${TM_SELECTED_TEXT}} \\right)",
    description: "left( ... right)",
  },
  curlybracketl: {
    prefix: "@{",
    body: "\\left\\{ ${1:${TM_SELECTED_TEXT}} \\right\\\\}",
    description: "left{ ... right}",
  },
  bracketnl: {
    prefix: "@[",
    body: "\\left[ ${1:${TM_SELECTED_TEXT}} \\right]",
    description: "left[ ... right]",
  },
  wrapEnv: {
    body: "\n\\begin{$1}\n\t${0:${TM_SELECTED_TEXT}}\n\\end{$1}",
    description: "Wrap selection into an environment",
  },
  part: {
    prefix: "SPA",
    body: "\\part{${1:${TM_SELECTED_TEXT}}}",
    description: "part",
  },
  chapter: {
    prefix: "SCH",
    body: "\\chapter{${1:${TM_SELECTED_TEXT}}}",
    description: "chapter",
  },
  section: {
    prefix: "SSE",
    body: "\\section{${1:${TM_SELECTED_TEXT}}}",
    description: "section",
  },
  subsection: {
    prefix: "SSS",
    body: "\\subsection{${1:${TM_SELECTED_TEXT}}}",
    description: "subsection",
  },
  subsubsection: {
    prefix: "SS2",
    body: "\\subsubsection{${1:${TM_SELECTED_TEXT}}}",
    description: "subsubsection",
  },
  paragraph: {
    prefix: "SPG",
    body: "\\paragraph{${1:${TM_SELECTED_TEXT}}}",
    description: "paragraph",
  },
  subparagraph: {
    prefix: "SSP",
    body: "\\subparagraph{${1:${TM_SELECTED_TEXT}}}",
    description: "subparagraph",
  },
});

var rules = [
  // Scraped from https://github.com/braver/vscode-solarized/
  { token: "", foreground: "839496", background: "002b36" },
  { token: "comment", foreground: "586e75" },
  { token: "meta.documentation", foreground: "586e75" },
  { token: "string", foreground: "2aa198" },
  { token: "string.regexp", foreground: "2aa198" },
  { token: "constant.character.escape", foreground: "dc322f" },
  { token: "constant.numeric", foreground: "6c71c4" },
  { token: "variable", foreground: "268bd2" },
  { token: "variable.other.readwrite", foreground: "839496" },
  { token: "variable.other.object", foreground: "839496" },
  { token: "variable.other.constant", foreground: "839496" },
  { token: "variable.function", foreground: "b58900" },
  { token: "variable.language.this", foreground: "d33682" },
  { token: "variable.language.super", foreground: "d33682" },
  { token: "keyword", foreground: "859900" },
  { token: "meta.import keyword", foreground: "cb4b16" },
  { token: "keyword.control.import", foreground: "cb4b16" },
  { token: "keyword.control.import.from", foreground: "cb4b16" },
  { token: "keyword.other.import", foreground: "cb4b16" },
  { token: "keyword.control.at-rule.include", foreground: "cb4b16" },
  { token: "keyword.control.at-rule.import", foreground: "cb4b16" },
  { token: "keyword.operator.comparison", foreground: "657b83" },
  { token: "keyword.operator.assignment", foreground: "657b83" },
  { token: "keyword.operator.arithmetic", foreground: "657b83" },
  { token: "storage", foreground: "859900" },
  { token: "keyword.control.class", foreground: "b58900" },
  { token: "meta.class", foreground: "b58900" },
  { token: "entity.name.class", foreground: "b58900" },
  { token: "entity.name.type.class", foreground: "b58900" },
  { token: "support.type", foreground: "859900" },
  { token: "support.class", foreground: "859900" },
  { token: "entity.name.function", foreground: "b58900" },
  { token: "punctuation.definition.variable", foreground: "859900" },
  { token: "constant.language", foreground: "b58900" },
  { token: "meta.preprocessor", foreground: "b58900" },
  { token: "support.function.construct", foreground: "dc322f" },
  { token: "keyword.other.new", foreground: "dc322f" },
  { token: "constant.character", foreground: "cb4b16" },
  { token: "constant.other", foreground: "cb4b16" },
  { token: "entity.name.tag", foreground: "268bd2" },
  { token: "punctuation.definition.tag.html", foreground: "586e75" },
  { token: "punctuation.definition.tag.begin", foreground: "586e75" },
  { token: "punctuation.definition.tag.end", foreground: "586e75" },
  { token: "support.function", foreground: "859900" },
  { token: "punctuation.separator.continuation", foreground: "dc322f" },
  { token: "storage.type", foreground: "268bd2" },
  { token: "support.type.exception", foreground: "cb4b16" },
  { token: "keyword.other.special-method", foreground: "cb4b16" },
  { token: "invalid", background: "6e2e32" },
  { token: "string.quoted.double", foreground: "2aa198" },
  { token: "string.quoted.single", foreground: "2aa198" },
  { token: "punctuation.definition.string.begin", foreground: "839496" },
  { token: "punctuation.definition.string.end", foreground: "839496" },
  { token: "meta.brace.square", foreground: "268bd2" },
  { token: "meta.brace.round", foreground: "657b83" },
  { token: "punctuation.definition.parameters.begin", foreground: "657b83" },
  { token: "punctuation.definition.parameters.end", foreground: "657b83" },
  { token: "meta.brace.curly", foreground: "657b83" },
  { token: "support.constant.color", foreground: "b58900" },
  {
    token: "invalid.deprecated.color.w3c-non-standard-color-name.scss",
    foreground: "b58900",
  },
  { token: "meta.selector.css", foreground: "657b83" },
  { token: "entity.name.tag.css", foreground: "b58900" },
  { token: "entity.name.tag.scss", foreground: "b58900" },
  {
    token: "source.less keyword.control.html.elements",
    foreground: "b58900",
  },
  { token: "source.sass keyword.control.untitled", foreground: "b58900" },
  { token: "entity.other.attribute-name.class.css", foreground: "b58900" },
  { token: "entity.other.attribute-name.class.sass", foreground: "b58900" },
  {
    token: "source.css entity.other.attribute-name.id",
    foreground: "b58900",
  },
  {
    token: "source.less entity.other.attribute-name.id",
    foreground: "b58900",
  },
  {
    token: "source.scss entity.other.attribute-name.id",
    foreground: "b58900",
  },
  {
    token: "source.sass entity.other.attribute-name.id",
    foreground: "b58900",
  },
  {
    token: "entity.other.attribute-name.pseudo-element.css",
    foreground: "268bd2",
  },
  { token: "entity.other.attribute-name.pseudo-class", foreground: "268bd2" },
  {
    token: "entity.other.attribute-name.tag.pseudo-class",
    foreground: "268bd2",
  },
  { token: "text.html.basic meta.tag.other.html", foreground: "657b83" },
  { token: "text.html.basic meta.tag.any.html", foreground: "657b83" },
  { token: "text.html.basic meta.tag.block.any", foreground: "657b83" },
  { token: "text.html.basic meta.tag.inline.any", foreground: "657b83" },
  {
    token: "text.html.basic meta.tag.structure.any.html",
    foreground: "657b83",
  },
  { token: "text.html.basic source.js.embedded.html", foreground: "657b83" },
  { token: "punctuation.separator.key-value.html", foreground: "657b83" },
  {
    token: "text.html.basic entity.other.attribute-name.html",
    foreground: "b58900",
  },
  { token: "meta.tag.xml entity.other.attribute-name", foreground: "b58900" },
  { token: "keyword.other.special-method.ruby", foreground: "859900" },
  { token: "variable.other.constant.ruby", foreground: "b58900" },
  { token: "constant.other.symbol.ruby", foreground: "2aa198" },
  { token: "keyword.other.special-method.ruby", foreground: "cb4b16" },
  {
    token: "meta.array support.function.construct.php",
    foreground: "b58900",
  },
  { token: "entity.name.function.preprocessor.c", foreground: "cb4b16" },
  { token: "meta.preprocessor.c.include", foreground: "cb4b16" },
  { token: "meta.preprocessor.macro.c", foreground: "cb4b16" },
  { token: "meta.preprocessor.c.include string", foreground: "2aa198" },
  {
    token: "meta.preprocessor.c.include punctuation.definition.string.begin",
    foreground: "2aa198",
  },
  {
    token: "meta.preprocessor.c.include punctuation.definition.string.end",
    foreground: "2aa198",
  },
  { token: "other.package.exclude", foreground: "dc322f" },
  { token: "other.remove", foreground: "dc322f" },
  { token: "other.add", foreground: "2aa198" },
  { token: "punctuation.section.group.tex", foreground: "dc322f" },
  {
    token: "punctuation.definition.arguments.begin.latex",
    foreground: "dc322f",
  },
  {
    token: "punctuation.definition.arguments.end.latex",
    foreground: "dc322f",
  },
  { token: "punctuation.definition.arguments.latex", foreground: "dc322f" },
  { token: "meta.group.braces.tex", foreground: "b58900" },
  { token: "string.other.math.tex", foreground: "b58900" },
  { token: "variable.parameter.function.latex", foreground: "cb4b16" },
  { token: "punctuation.definition.constant.math.tex", foreground: "dc322f" },
  { token: "text.tex.latex constant.other.math.tex", foreground: "2aa198" },
  { token: "constant.other.general.math.tex", foreground: "2aa198" },
  { token: "constant.other.general.math.tex", foreground: "2aa198" },
  { token: "constant.character.math.tex", foreground: "2aa198" },
  { token: "string.other.math.tex", foreground: "b58900" },
  { token: "punctuation.definition.string.begin.tex", foreground: "dc322f" },
  { token: "punctuation.definition.string.end.tex", foreground: "dc322f" },
  { token: "keyword.control.label.latex", foreground: "2aa198" },
  {
    token: "text.tex.latex constant.other.general.math.tex",
    foreground: "2aa198",
  },
  {
    token: "variable.parameter.definition.label.latex",
    foreground: "dc322f",
  },
  { token: "support.function.be.latex", foreground: "859900" },
  { token: "support.function.section.latex", foreground: "cb4b16" },
  { token: "support.function.general.tex", foreground: "2aa198" },
  { token: "keyword.control.ref.latex", foreground: "2aa198" },
  { token: "storage.type.class.python", foreground: "859900" },
  { token: "storage.type.function.python", foreground: "859900" },
  { token: "storage.modifier.global.python", foreground: "859900" },
  { token: "support.type.exception.python", foreground: "b58900" },
  { token: "meta.scope.for-in-loop.shell", foreground: "586e75" },
  { token: "variable.other.loop.shell", foreground: "586e75" },
  { token: "meta.scope.case-block.shell", foreground: "586e75" },
  { token: "meta.scope.case-body.shell", foreground: "586e75" },
  {
    token: "punctuation.definition.logical-expression.shell",
    foreground: "dc322f",
  },
  { token: "storage.modifier.import.java", foreground: "93a1a1" },
  { token: "support.function.perl", foreground: "268bd2" },
  { token: "meta.diff", foreground: "586e75" },
  { token: "meta.diff.header", foreground: "586e75" },
  { token: "meta.diff.range", foreground: "268bd2" },
  { token: "markup.deleted", foreground: "dc322f" },
  { token: "markup.changed", foreground: "2aa198" },
  { token: "markup.inserted", foreground: "859900" },
  { token: "markup.heading", foreground: "b58900" },
  { token: "punctuation.definition.heading.markdown", foreground: "b58900" },
  { token: "markup.quote", foreground: "859900" },
  { token: "markup.italic", fontStyle: "italic" },
  { token: "markup.bold", fontStyle: "bold" },
  { token: "markup.underline.link.markdown", foreground: "2aa198" },
  {
    token: "meta.link.reference constant.other.reference.link.markdown",
    foreground: "2aa198",
  },
  { token: "constant.other.reference.link.markdown", foreground: "6c71c4" },
  {
    token: "meta.paragraph.markdown meta.dummy.line-break",
    background: "586e75",
  },
  {
    token: "sublimelinter.notes",
    background: "586e75",
    foreground: "586e75",
  },
  {
    token: "sublimelinter.outline.illegal",
    background: "586e75",
    foreground: "586e75",
  },
  { token: "sublimelinter.underline.illegal", background: "dc322f" },
  {
    token: "sublimelinter.outline.warning",
    background: "839496",
    foreground: "839496",
  },
  { token: "sublimelinter.underline.warning", background: "b58900" },
  {
    token: "sublimelinter.outline.violation",
    background: "657b83",
    foreground: "657b83",
  },
  { token: "sublimelinter.underline.violation", background: "cb4b16" },
  { token: "sublimelinter.mark.warning", foreground: "b58900" },
  { token: "sublimelinter.mark.error", foreground: "dc322f" },
  { token: "sublimelinter.gutter-mark", foreground: "657b83" },
  { token: "brackethighlighter.all", foreground: "586e75" },
  { token: "entity.name.filename.find-in-files", foreground: "2aa198" },
  {
    token: "constant.numeric.line-number.find-in-files",
    foreground: "586e75",
  },
  { token: "markup.deleted.git_gutter", foreground: "dc322f" },
  { token: "markup.inserted.git_gutter", foreground: "859900" },
  { token: "markup.changed.git_gutter", foreground: "b58900" },
  { token: "meta.class punctuation", foreground: "839496" },
];

monaco.languages.register({
  id: "bibtex",
});
monaco.languages.setMonarchTokensProvider("bibtex", {
  displayName: "BibTeX",
  name: "bibtex",
  mimeTypes: ["text/bibtex"],
  fileExtensions: ["bib"],
  ignoreCase: true,

  lineComment: "% ",

  entries: [
    "article",
    "book",
    "booklet",
    "conference",
    "inbook",
    "incollection",
    "inproceedings",
    "manual",
    "mastersthesis",
    "misc",
    "phdthesis",
    "proceedings",
    "techreport",
    "unpublished",
    "xdata",
    "preamble",
    "string",
    "comment",
  ],

  fields: [
    "address",
    "annote",
    "author",
    "booktitle",
    "chapter",
    "crossref",
    "edition",
    "editor",
    "howpublished",
    "institution",
    "journal",
    "key",
    "month",
    "note",
    "number",
    "organization",
    "pages",
    "publisher",
    "school",
    "series",
    "title",
    "type",
    "volume",
    "year",
    "url",
    "isbn",
    "issn",
    "lccn",
    "abstract",
    "keywords",
    "price",
    "copyright",
    "language",
    "contents",
    "numpages",
    "doi",
    "http",
    "eds",
    "editors",
    "location",
    "eprinttype",
    "etype",
    "eprint",
    "eprintpath",
    "primaryclass",
    "eprintclass",
    "archiveprefix",
    "origpublisher",
    "origlocation",
    "venue",
    "volumes",
    "pagetotal",
    "annotation",
    "annote",
    "pubstate",
    "date",
    "urldate",
    "eventdate",
    "origdate",
    "urltext",
  ],

  tokenizer: {
    root: [
      ["\\\\[^a-z]", "string.escape"],

      [
        "(@)([a-z]+)(\\{)(\\s*[^\\s,=]+)?",
        [
          "keyword",
          {
            cases: {
              "$2@entries": "keyword",
              "@default": "",
            },
          },
          "@brackets",
          "type",
        ],
      ],

      [
        "\\b([a-z]+)(?=\\s*=)",
        {
          cases: {
            "$1@fields": "constructor",
            "@default": "",
          },
        },
      ],

      ["[=]", "keyword"],

      { include: "@whitespace" },

      ["[{}()\\[\\]]", "@brackets"],
    ],

    whitespace: [
      ["[ \\t\\r\\n]+", "white"],
      ["%.*$", "comment"],
    ],
  },
});

monaco.languages.register({
  id: "latex",
});
monaco.languages.setMonarchTokensProvider("latex", {
  displayName: "Latex",
  name: "latex",
  mimeTypes: ["text/latex", "text/tex"],
  fileExtensions: ["tex", "sty", "cls"],

  lineComment: "% ",

  builtin: [
    "addcontentsline",
    "addtocontents",
    "addtocounter",
    "address",
    "addtolength",
    "addvspace",
    "alph",
    "appendix",
    "arabic",
    "author",
    "backslash",
    "baselineskip",
    "baselinestretch",
    "bf",
    "bibitem",
    "bigskipamount",
    "bigskip",
    "boldmath",
    "boldsymbol",
    "cal",
    "caption",
    "cdots",
    "centering",
    "chapter",
    "circle",
    "cite",
    "cleardoublepage",
    "clearpage",
    "cline",
    "closing",
    "color",
    "copyright",
    "dashbox",
    "date",
    "ddots",
    "documentclass",
    "dotfill",
    "em",
    "emph",
    "ensuremath",
    "epigraph",
    "euro",
    "fbox",
    "flushbottom",
    "fnsymbol",
    "footnote",
    "footnotemark",
    "footnotesize",
    "footnotetext",
    "frac",
    "frame",
    "framebox",
    "frenchspacing",
    "hfill",
    "hline",
    "href",
    "hrulefill",
    "hspace",
    "huge",
    "Huge",
    "hyphenation",
    "include",
    "includegraphics",
    "includeonly",
    "indent",
    "input",
    "it",
    "item",
    "kill",
    "label",
    "large",
    "Large",
    "LARGE",
    "LaTeX",
    "LaTeXe",
    "ldots",
    "left",
    "lefteqn",
    "line",
    "linebreak",
    "linethickness",
    "linewidth",
    "listoffigures",
    "listoftables",
    "location",
    "makebox",
    "maketitle",
    "markboth",
    "mathcal",
    "mathop",
    "mbox",
    "medskip",
    "multicolumn",
    "multiput",
    "newcommand",
    "newcolumntype",
    "newcounter",
    "newenvironment",
    "newfont",
    "newlength",
    "newline",
    "newpage",
    "newsavebox",
    "newtheorem",
    "nocite",
    "noindent",
    "nolinebreak",
    "nonfrenchspacing",
    "normalsize",
    "nopagebreak",
    "not",
    "onecolumn",
    "opening",
    "oval",
    "overbrace",
    "overline",
    "pagebreak",
    "pagenumbering",
    "pageref",
    "pagestyle",
    "par",
    "paragraph",
    "parbox",
    "parindent",
    "parskip",
    "part",
    "protect",
    "providecommand",
    "put",
    "raggedbottom",
    "raggedleft",
    "raggedright",
    "raisebox",
    "ref",
    "renewcommand",
    "right",
    "rm",
    "roman",
    "rule",
    "savebox",
    "sbox",
    "sc",
    "scriptsize",
    "section",
    "setcounter",
    "setlength",
    "settowidth",
    "sf",
    "shortstack",
    "signature",
    "sl",
    "slash",
    "small",
    "smallskip",
    "sout",
    "space",
    "sqrt",
    "stackrel",
    "stepcounter",
    "subparagraph",
    "subsection",
    "subsubsection",
    "tableofcontents",
    "telephone",
    "TeX",
    "textbf",
    "textcolor",
    "textit",
    "textmd",
    "textnormal",
    "textrm",
    "textsc",
    "textsf",
    "textsl",
    "texttt",
    "textup",
    "textwidth",
    "textheight",
    "thanks",
    "thispagestyle",
    "tiny",
    "title",
    "today",
    "tt",
    "twocolumn",
    "typeout",
    "typein",
    "uline",
    "underbrace",
    "underline",
    "unitlength",
    "usebox",
    "usecounter",
    "uwave",
    "value",
    "vbox",
    "vcenter",
    "vdots",
    "vector",
    "verb",
    "vfill",
    "vline",
    "vphantom",
    "vspace",

    "RequirePackage",
    "NeedsTeXFormat",
    "usepackage",
    "input",
    "include",
    "documentclass",
    "documentstyle",
    "def",
    "edef",
    "defcommand",
    "if",
    "ifdim",
    "ifnum",
    "ifx",
    "fi",
    "else",
    "begingroup",
    "endgroup",
    "definecolor",
    "textcolor",
    "color",
    "eifstrequal",
    "eeifstrequal",
  ],
  tokenizer: {
    root: [
      [
        "(\\\\begin)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})",
        [
          "keyword.predefined",
          "white",
          "@brackets",
          { token: "tag.env-$4", bracket: "@open" },
          "@brackets",
        ],
      ],
      [
        "(\\\\end)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})",
        [
          "keyword.predefined",
          "white",
          "@brackets",
          { token: "tag.env-$4", bracket: "@close" },
          "@brackets",
        ],
      ],
      ["\\\\[^a-zA-Z@]", "keyword"],
      ["\\@[a-zA-Z@]+", "keyword.at"],
      [
        "\\\\([a-zA-Z@]+)",
        {
          cases: {
            "$1@builtin": "keyword.predefined",
            "@default": "keyword",
          },
        },
      ],
      { include: "@whitespace" },
      ["[{}()\\[\\]]", "@brackets"],
      ["#+\\d", "number.arg"],
      [
        "\\-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)\\s*(?:em|ex|pt|pc|sp|cm|mm|in)",
        "number.len",
      ],
    ],

    whitespace: [
      ["[ \\t\\r\\n]+", "white"],
      ["%.*$", "comment"],
    ],
  },
});

monaco.editor.defineTheme("latexTheme", {
  base: "vs-dark",
  inherit: false,
  rules: [
    { token: "custom-info", foreground: "808080" },
    { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
    { token: "custom-notice", foreground: "FFA500" },
    { token: "custom-date", foreground: "008800" },
  ],
});

monaco.languages.registerCompletionItemProvider("latex", {
  provideCompletionItems: () => {
    return {
      suggestions: suggestions.map((rule) => {
        return {
          label: "\\" + rule.description,
          kind: monaco.languages.CompletionItemKind.Method,
          insertText: rule.body.substr(1),
          documentation: rule.description,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        };
      }),
    };
  },
});

// Define a dark solarized theme.
// monaco.editor.defineTheme("solarized-dark", {
//   base: "vs-dark",
//   inherit: false,
//   rules: rules,
//   colors: {
//     "editorIndentGuides.background": "#1CD1FF12",
//     "editorIndentGuide.activeBackground": "#1CD1FF12",
//     "editor.background": "#002b36",
//     "editor.caret": "#eee8d5",
//     "editor.foreground": "#839496",
//     "editor.gutter": "#073642",
//     "editor.invisibles": "#586e75",
//     "editor.lineHighlight": "#1CD1FF12",
//     "editor.selection": "#586e7559",
//     "editor.inactiveSelection": "#586e7540",
//     "editor.selectionBorder": "#586e75",
//     "editor.guide": "#1CD1FF12",
//     "editor.activeLinkForeground": "#268bd2",
//     "editor.selectionHighlight": "#2aa19826",
//     "editor.hoverHighlight": "#2aa19826",
//     "editor.findMatchHighlight": "#85990033",
//     "editor.currentFindMatchHighlight": "#85990059",
//     "editor.wordHighlight": "#6c71c433",
//     "editor.wordHighlightStrong": "#6c71c44D",
//     "editor.referenceHighlight": "#6c71c466",
//     "editor.rangeHighlight": "#6c71c41A",
//     "editor.findRangeHighlight": "#6c71c433",
//   },
// });

var editor = monaco.editor.create(document.getElementById("editor"), {
  autoClosingBrackets: true,
  value: `\\documentclass[12pt,fleqn,leqno,letterpaper]{article}
  
\\include{preamble}
    
\\title{Document Title}
\\author{Author Name \\\\
  \\small{Class Number - Class Name} \\\\
  \\small{Your Educational Institution} \\\\
  \\small{\\texttt{email@address.com}} \\\\
}
\\date{December 15, 2012}
    
\\begin{document}
  \\maketitle
\\end{document}`,
  language: "latex",
  theme: "vs",
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
});
