import React from "react";
import { Infos } from "../types/schema";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SummaryDetailFramer from "./ui/SummaryDetailFramer";

type Props = {
  input: Infos;
};

const ContentInfos = ({ input }: Props) => {
  return (
    <div className='content--infos pt-header-height px-lg'>
      <div className='grid md:grid-cols-8'>
        <div className='col-span-5 col-start-4 mb-lg'>
          {input.about && (
            <div className='grid md:grid-cols-5 gap-md'>
              <h2 className='col-span-2'>About</h2>
              <div className='col-span-3'>
                <div className='text'>
                  <PortableText
                    value={input.about}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='col-span-5 col-start-4 mb-xl'>
          {input.textsDropDown &&
            input.textsDropDown.map((item, i) => (
              <div className='item' key={i}>
                {item.text && (
                  <SummaryDetailFramer
                    summary={item.title || ""}
                    detail={
                      <div className='text'>
                        <PortableText
                          value={item.text}
                          components={portableTextComponents}
                        />
                      </div>
                    }
                  />
                )}
              </div>
            ))}
        </div>
        {input.colophon && (
          <div className='col-span-4'>
            {input.colophon.map((item, i) => (
              <div className='item grid md:grid-cols-4 gap-md mb-md' key={i}>
                <div className='key'>{item.key}</div>
                <div className='text md:col-span-2'>
                  {item.val && (
                    <PortableText
                      value={item.val}
                      components={portableTextComponents}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </div>
  );
};

export default ContentInfos;
