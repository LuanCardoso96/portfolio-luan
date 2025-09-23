import React from 'react'

export default function ImageWithFallback({ src, alt, className, fallbackSrc, ...props }) {
  const [imgSrc, setImgSrc] = React.useState(src)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      if (fallbackSrc) {
        setImgSrc(fallbackSrc)
      } else {
        // Fallback padrão
        setImgSrc('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop')
      }
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  )
}
