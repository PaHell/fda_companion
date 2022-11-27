import type { App } from "$lib/../app";

export enum ValidationRuleName {
    _MissingRuleFunction,
    Required,
    Range,
    Email,
}

export const validationRules : App.General.ValidationRule[] = [
    {
      name: ValidationRuleName.Required,
      message: "This field is required",
      predicate: val => !!val,
    },
    {
      name: ValidationRuleName.Email,
      message: "This field must be a valid email address",
      predicate: val => {
        const regExpr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExpr.test(String(val).toLowerCase());
      },
    },
    {
      name: ValidationRuleName.Range,
      message: "This field must be between {0} and {1}.",
      predicate: (val, min, max) => {
        return typeof(val) == "number" ? val >= min && val <= max : val.length >= min && val.length <= max;
      },
    },
  ];

export function validate(value: string | number, ruleArgGroups: [ValidationRuleName, ...number[]][]) : [string, ...number[]][] {
    const invalidRules : [string, ...number[]][] = [];
    for (const ruleArgGroup of ruleArgGroups) {
      const args = ruleArgGroup.slice(1);
      const rule = validationRules.find((o) => o.name === ruleArgGroup[0]);
      if (!rule) invalidRules.push([`Missing validation object for rule App.General.ValidationRule[${ruleArgGroup[0]}]`, ]);
      else if (!rule.predicate(value, ...args)) invalidRules.push([rule.message, ...args]);
    }
    return invalidRules;
  }