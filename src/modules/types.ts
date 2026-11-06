// Item Types
export type Rarity = 'semi' | 'epic' | 'ultra' | 'ultra legend' | 'legendary' | 'fabled' | 'mythical' | 'extinct' | 'vote rare' | 'creature' | 'fishing special' | 'leaderboard' | 'politics special' | 'pet special'
export type Location = 'cartoon' | 'spongebob' | 'adventure time' | 'avatar earth' | 'avatar water' | 'avatar fire' | 'avatar air'
export type Tags = 'mining' | 'lopping' | 'fishing' | 'farming' | 'looting' | 'pvp' | 'arcade' | 'misc'

export type Item = {
    name: string
    rarity: Rarity
    location?: Location
    map: string
    item: string
    enchants?: Array<string>
    tint?: string
    hints: Array<string>
    tags: Array<Tags>
}

// Munchy NBT Types
export type NBT = {
    id: string
    count: number
    components: {
        'minecraft:dyed_color'?: number
        'minecraft:attribute_modifiers'?: Array<Attributes>
        'minecraft:lore': Array<string | Text>
        'minecraft:unbreakable'?: object
        'minecraft:custom_name'?: Text
        'minecraft:enchantments'?: Enchantments
        'minecraft:custom_model_data'?: CustomModelData
        'minecraft:custom_data'?: CustomData
    }
}

export type Enchantments = {
    [key: string]: number
}

export type Attributes = {
    type: string
    operation: string
    amount: number
    id: string
    slot: string
}

export type Text = {
    text: string
    color?: string
    italic?: number | boolean
    bold?: number | boolean
    extra?: Array<string | Text>
}

export type CustomModelData = {
    strings?: Array<string>
    floats?: Array<number>
    flags?: Array<boolean>
    colors?: Array<number>
}

export type CustomData = {
    PublicBukkitValues?: {
        'mprison:item_data'?: {
            'mprison:item_type'?: string
            'mprison:hints'?: Array<number>
            'mprison:item_stats'?: {
                'mprison:hits'?: number
                'mprison:mined'?: number
                'mprison:kills'?: number
            }
            'mprison:dupeid'?: {
                'mprison:unique_id'?: number
                'mprison:finder_name'?: string
                'mprison:spawn_type'?: number
                'mprison:owner'?: number
            }
        }
    }
}
