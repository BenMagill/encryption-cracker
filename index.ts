#!/usr/bin/env node


/**
 * Allow it to be used as a module or on the command line
 * 
 * If run as an executable just get the options, convert them to the programs options and execute it
 */

import ceaserCipher from "./ceaserCipher.js"
import esMain from "es-main"
import { Command } from "commander"
import {ICeaserOptions, ISubstitOptions} from "./interfaces"

const program = new Command()

const crack = (data: string, type: "ceaser" | "substitution",  options: ICeaserOptions|ISubstitOptions) => {
    if (type === "substitution") {
        // TODO: add substitution cracking
    } else {
        return ceaserCipher(data, options)
    }
}

export default crack

if (esMain(import.meta)) {
    program
        .version("1.0.0")
        .option("-t, --type <type>", "the encrpytion type to crack")
    program.parse(process.argv)

    console.log(program.opts())
    console.log("Coming soon")
}