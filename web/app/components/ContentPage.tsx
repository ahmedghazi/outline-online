import React from "react";
import { Page, Settings } from "../types/schema";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SummaryDetailFramer from "./ui/SummaryDetailFramer";
import NavTertiary from "./NavTertiary";

type Props = {
  input: Page;
};

const ContentPage = ({ input }: Props) => {
  return (
    <div className='content content--page pt-header-height px-sm md:px-lg'>
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
      </div>
      {input.withNav && <NavTertiary />}

      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
    </div>
  );
};

export default ContentPage;
