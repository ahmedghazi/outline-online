import React from "react";
import { Infos } from "../types/schema";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SummaryDetailFramer from "./ui/SummaryDetailFramer";
import NavTertiary from "./NavTertiary";

type Props = {
  input: Infos;
};

const ContentInfos = ({ input }: Props) => {
  return (
    <div className='content content--infos pt-header-height px-sm md:px-lg'>
      <div className='grid md:grid-cols-8 md:gap-md'>
        <div className='md:col-span-5 md:col-start-4 mb-1e md:mb-lg'>
          {input.about && (
            <div className='grid md:grid-cols-5 gap-1e'>
              <h2 className='md:col-span-2'>ABOUT</h2>
              <div className='md:col-span-3'>
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
        <div className='md:col-span-5 md:col-start-4 mb-1e md:mb-xl'>
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
          <div className='md:col-span-4'>
            {input.colophon.map((item, i) => (
              <div
                className='item grid md:grid-cols-4 gap-1e mb-1e md:mb-md'
                key={i}>
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
      {input.withNav && <NavTertiary />}
    </div>
  );
};

export default ContentInfos;
