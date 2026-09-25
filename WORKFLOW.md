# FE-03 Workflow Comparison

## Feature

The capstone-relevant feature used for this experiment was a portfolio contact form with validation, error handling, submission feedback, and a custom visual design. The goal was to compare a vague AI-assisted workflow with a precise, specification-driven workflow.

## Round 1 — `fe03-vague`

The first round used only a short prompt asking Codex to create a contact form for the portfolio. No specific fields, visual style, component structure, accessibility requirements, validation rules, or testing instructions were provided.

### Correctness

Codex produced a surprisingly complete and functional form. It independently selected the form structure, added client-side validation, generated inline error handling, and performed project checks despite having an isolated environment not having any outside interference or context on what the feature should look. The implementation exceeded the minimum requirement despite the vague prompt.

### Accessibility

The generated form included standard form controls and interaction states, but accessibility decisions were mostly left to Codex. Since no specific accessibility requirements were provided, these decisions needed to be reviewed manually.

### Edge Cases

Codex independently anticipated validation cases without being explicitly asked to do so. This showed useful autonomy, but the validation rules and behaviors were assumptions made by the AI rather than requirements I had defined.

### Review Effort

The main review concern was whether Codex's independent decisions matched my intended portfolio direction. The feature worked well, but its visual design was substantially different from the style I wanted, so the result would require additional direction to align it with my intended design.

### Workflow

Vague prompt → AI implementation → autonomous validation and error handling → project checks → human review

## Round 2 — `fe03-precise`

The second round started from the same baseline using a fresh Codex session. I provided explicit requirements for functionality, accessibility, visual theme, component separation, file organization, and verification.

### Correctness

Codex created the requested functionality and separated the contact feature into focused files instead of placing unrelated responsibilities into one component. It also created tests for the requested validation and submission paths.

### Accessibility

Accessibility requirements were explicitly specified, including accessible labels, keyboard navigation, visible focus states, and clear validation feedback. This reduced reliance on AI assumptions and gave me clearer criteria for reviewing the implementation.

### Edge Cases

The requested tests covered empty required fields, invalid email input, short messages, and successful submission. The first test attempt did not complete correctly. After further investigation, Codex identified a test configuration issue and then a test-isolation problem caused by previous renders persisting between cases. Cleanup was added, and all four requested test paths passed.

### Review Effort

Round 2 required more planning and specification before implementation, but it provided clearer criteria for reviewing the result. The generated UI also matched my intended visual direction much more closely, reducing the amount of design adjustment needed after implementation.

### Workflow

Precise specification → project exploration → implementation plan → implementation → testing → debugging → lint and build verification → browser review

## Conclusion

Both approaches produced capable and functional results. The vague workflow demonstrated that AI can independently make strong implementation and design decisions from very little instruction. However, those decisions may not match the developer's intended direction.

The precise workflow provided greater control over correctness, accessibility, edge cases, component architecture, testing, and visual design. The testing issues in Round 2 also showed that AI-generated verification still requires human review and interpretation.

This experiment reinforced that effective AI-assisted development is not simply about asking AI to generate code. It involves providing clear constraints, reviewing the decisions made by the AI, and verifying that the final implementation actually satisfies the intended requirements.