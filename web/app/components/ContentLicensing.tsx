import React from "react";
import { Infos, Licensing } from "../types/schema";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SummaryDetailFramer from "./ui/SummaryDetailFramer";

type Props = {
  input: Licensing;
};

const ContentLicensing = ({ input }: Props) => {
  return (
    <div className='content content--licensing pt-header-height px-sm md:px-lg'>
      <div className='grid md:grid-cols-8 gap-md'>
        <div className='md:col-span-5 md:col-start-4 '>
          {input.text && (
            <div className='grid md:grid-cols-5 gap-md'>
              <h1 className='md:col-span-2'>{input.title}</h1>
              <div className='md:col-span-3'>
                <div className='text'>
                  <PortableText
                    value={input.text}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='md:col-span-5 md:col-start-4'>
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
        <div className='md:col-span-7'>
          <div className='grid md:grid-cols-7 gap-md'>
            <h2 className='md:col-span-2'>{input.eulaLabel}</h2>
            <div className='items md:col-span-5'>
              {input.eulaTtextsDropDown?.map((item, i) => (
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
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </div>
  );
};

export default ContentLicensing;
