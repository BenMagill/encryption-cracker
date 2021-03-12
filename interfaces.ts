interface ICeaserOptions {
    /** The characters that can be shifted. Order matters and should be the same as used to encrypt */
    alphabet?: string, 
    frequency?: {
        includeSpaces: boolean
    },
    /** Pass each possible result to a function */
    onResult?(result: {value: string, progress: number, total: number}): void,
    /** Should lowercase and uppercase letters be treated the same */
    ignoreCase?: boolean
}

interface ISubstitOptions {

}

export {
    ICeaserOptions, 
    ISubstitOptions
}