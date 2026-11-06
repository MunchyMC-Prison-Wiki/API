import { Item, NBT } from "./types"

export default class NBTParser {
    public parse(nbt: string) {
        let result = ''

        for (let i = 0; i < nbt.length; i++) {
            const char = nbt[i]

            // Strings
            if (char === '"') {
                const start = i++

                while (i < nbt.length) {
                    if (nbt[i] === '\\') {
                        i += 2
                        continue
                    }

                    if (nbt[i] === '"') {
                        i++
                        break
                    }

                    i++
                }

                result += nbt.slice(start, i)
                i--
                continue
            }

            // Arrays
            if (char === '[' && /^[BIL];/i.test(nbt.slice(i + 1, i + 3))) {
                const end = nbt.indexOf(']', i)

                if (end === -1) {
                    throw new Error('Unterminated NBT array')
                }

                const values = nbt.slice(i + 3, end)
                    .split(',')
                    .filter(Boolean)
                    .map(value => {
                        const parsed = Number(value.trim())

                        if (!Number.isFinite(parsed)) {
                            throw new Error(`Invalid NBT array value: ${value}`)
                        }

                        return parsed
                    })

                result += JSON.stringify(values)
                i = end
                continue
            }

            // NBT Specific Suffixes
            if (char === '-' || char === '+' || char === '.' || /\d/.test(char)) {
                const match = nbt.slice(i).match(
                    /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?[bBsSlLfFdD]?/
                )

                if (match && match[0]) {
                    const token = match[0]
                    const next = nbt[i + token.length]

                    if (!next || /[\s,\]}]/.test(next)) {
                        result += token.replace(/[bBsSlLfFdD]$/, '')
                        i += token.length - 1
                        continue
                    }
                }
            }

            result += char
        }

        return this.normalise(JSON.parse(result))
    }

    private getHints(nbt: NBT) {
        const amount = Number(nbt.components["minecraft:custom_data"]?.PublicBukkitValues?.["mprison:item_data"]?.["mprison:hints"]?.length)
        const lore = nbt.components["minecraft:lore"]
        let hints = []

        if (!amount) return

        for (let i = 0; i < amount; i++) {
            // @ts-nocheck
            // @ts-ignore
            hints.push(String(lore[(lore.length - 1) - i].text).replace(' ⁕ ', ''))
        }

        return hints
    }

    private getEnchants(nbt: NBT) {
        const enchantments = nbt.components["minecraft:enchantments"]

        if (!enchantments) return

        return Object.entries(enchantments).map(([key, level]) => {
            const name = key.replace("minecraft:", "")

            return `${name} ${level}`
        })
    }

    private getHex(dec: number) {
        const r = (dec >> 16) & 0xFF
        const g = (dec >> 8) & 0xFF
        const b = dec & 0xFF

        return "#" + [r, g, b].map(channel => channel.toString(16).padStart(2, "0")).join("").toUpperCase()
    }

    private normalise(nbt: NBT) {
        const map = '12'

        let item: Item = {
            name: String(nbt.components["minecraft:custom_name"]?.text),
            // @ts-nocheck
            // @ts-ignore
            rarity: String(nbt.components["minecraft:lore"][0].extra[1].text).toLowerCase(),
            // @ts-nocheck
            // @ts-ignore
            location: String(nbt.components["minecraft:lore"][0].extra[0].text).toLowerCase(),
            map: map,
            // @ts-nocheck
            // @ts-ignore
            item: nbt.components["minecraft:custom_model_data"] ? "munchy_" + nbt.components["minecraft:custom_model_data"].strings[0] : nbt.id.split(':').join('_'),
            enchants: this.getEnchants(nbt),
            tint: nbt.components["minecraft:dyed_color"] ? this.getHex(nbt.components["minecraft:dyed_color"]) : undefined,
            // @ts-nocheck
            // @ts-ignore
            hints: this.getHints(nbt),
            tags: []
        }

        return item
    }
}
