import { INewParse, IParse } from '../global';

export const parseResponse: IParse = params => {
  const { status, message, extData } = params;
  const count = extData.count || 0;
  const data = extData.data || [];

  return {
    status,
    message,
    count,
    data,
  };
};

export const parseNewResponse: INewParse = params => ({
  code: params.code,
  message: params.message || '',
  data: params.data || [],
});

export const parseRxjsResponse: any = (value: any) => value.data;
