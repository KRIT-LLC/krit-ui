export const renderTextWithBoldMarkdown = (text: string) => {
  // Парсинг и отрисовка текста как жирного, если вокруг подстроки **
  const regex = /\*\*(.*?)\*\*/g;
  const match = text.match(regex);
  if (!match) return text;
  const textShouldBeBold = match.map(item => item.replaceAll('*', ''));
  return text.split('**').map(part =>
    textShouldBeBold.includes(part) ? (
      <span key={part} className='text-foreground font-medium'>
        {part}
      </span>
    ) : (
      part
    ),
  );
};
