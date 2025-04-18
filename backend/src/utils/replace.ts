export type Replace<OriginalType, ReplacedType> = Omit<
    OriginalType,
    keyof ReplacedType
> &
    ReplacedType;