import { Choice } from "./initialState";

/**
 * This is not a particularly scalable algorithm for a large list, made worse by the cache check, but feels viable at a small
 * scale such as our initial state of 5 ice cream parlors. From a UX perspective, it's worth the tradeoff at this scale in order
 * to prevent prompting the user with the same two choices.
 * @param arr 
 * @returns An array that is ranked in order from favorite to least favorite
 */
export function bubbleSortChoicesWithUserInput(arr: Choice[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            const cachedPreferenceOrUndefined = checkPreferenceCache(arr[j], arr[j - 1]);
            // use cached preference if found, otherwise prompt user for input
            const finalPreference =
                cachedPreferenceOrUndefined
                ?? Number(prompt(`Enter 0 if you prefer ${arr[j].name}, or enter 1 if you prefer ${arr[j - 1].name}.`));
            
            // NOTE: this logic does not prevent duplicate values being added to the preferredTo array which seems a
            // a feasible tradeoff at a small scale versus additional lookups to prevent duplication
            if (Boolean(finalPreference)) {
                let temp = arr[j];
                arr[j] = { ...arr[j - 1], preferredTo: arr[j - 1].preferredTo.concat(temp.name) };
                arr[j - 1] = temp;
            } else {
                arr = arr.map(a => a.name === arr[j].name ? ({ ...a, preferredTo: a.preferredTo.concat(arr[j - 1].name) }) : a);
            }
        }
    }
    return arr.reverse();
}

/**
 * This check allows us to avoid prompting the user with the same two choices.
 * @param choiceA 
 * @param choiceB 
 * @returns 0 if choiceA includes choiceB in its preferredTo array, 1 if the converse exists,
 * or undefined if neither choice includes the other in its preferredTo array
 */
function checkPreferenceCache(choiceA: Choice, choiceB: Choice) {
    if (choiceA.preferredTo.includes(choiceB.name)) {
        return 0;
    } else if (choiceB.preferredTo.includes(choiceA.name)) {
        return 1;
    } else {
        return undefined;
    }
}