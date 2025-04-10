interface PlatformIconProps {
  platform: string
  size?: number
}

export function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case "rappi":
        return (
          <div
            className="flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            R
          </div>
        )
      case "ubereats":
        return (
          <div
            className="flex items-center justify-center rounded-full bg-black text-white text-xs font-bold"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            U
          </div>
        )
      case "didifood":
        return (
          <div
            className="flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            D
          </div>
        )
      default:
        return (
          <div
            className="flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            ?
          </div>
        )
    }
  }

  return getIcon()
}
