import SvgWrapper from './EmptyPageStyles';

function EmptyPage({ icon, text }) {
  return (
    <div className="flex flex-col justify-center items-center h-[55vh]">
      <SvgWrapper>
        {icon}
      </SvgWrapper>
      <p className="text-[color:var(--color-gray-06)]">{text}</p>
    </div>
  );
}

export default EmptyPage;
