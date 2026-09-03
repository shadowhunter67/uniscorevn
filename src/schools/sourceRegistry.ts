import type { AdmissionSource } from '../core/sourceRegistry';
import { hcmutSources } from './hcmut/sources';
import { uehSources } from './ueh/sources';
import { uelSources } from './uel/sources';
import { uitSources } from './uit/sources';
import { hcmusSources } from './hcmus/sources';
import { usshSources } from './ussh/sources';
import { uhsSources } from './uhs/sources';
import { iuSources } from './iu/sources';
import { aguSources } from './agu/sources';
import { hcmueSources } from './hcmue/sources';
import { hcmuteSources } from './hcmute/sources';
import { tdtuSources } from './tdtu/sources';
import { huflitSources } from './huflit/sources';
import { hutechSources } from './hutech/sources';
import { ufmSources } from './ufm/sources';
import { hcmulawSources } from './hcmulaw/sources';
import { vluSources } from './vlu/sources';
import { iuhSources } from './iuh/sources';
import { umpSources } from './ump/sources';
import { ftuSources } from './ftu/sources';
import { ptitSources } from './ptit/sources';
import { neuSources } from './neu/sources';
import { hubSources } from './hub/sources';
import { huitSources } from './huit/sources';
import { nttuSources } from './nttu/sources';
import { hsuSources } from './hsu/sources';
import { uefSources } from './uef/sources';
import { ctuSources } from './ctu/sources';
import { tdmuSources } from './tdmu/sources';
import { hiuSources } from './hiu/sources';
import { ouSources } from './ou/sources';
import { sguSources } from './sgu/sources';
import { hnueSources } from './hnue/sources';
import { vinhuniSources } from './vinhuni/sources';
import { utcSources } from './utc/sources';
import { hupSources } from './hup/sources';
import { vkuSources } from './vku/sources';
import { hceSources } from './hce/sources';
import { hulSources } from './hul/sources';
import { huscSources } from './husc/sources';
import { huafSources } from './huaf/sources';
import { hueeduSources } from './hueedu/sources';
import { ctumpSources } from './ctump/sources';
import { vnuaSources } from './vnua/sources';
import { pntuSources } from './pntu/sources';
import { apdSources } from './apd/sources';
import { bvuSources } from './bvu/sources';
import { bmtuSources } from './bmtu/sources';
import { hcaSources } from './hca/sources';
import { naemSources } from './naem/sources';
import { tbuSources } from './tbu/sources';
import { uhdSources } from './uhd/sources';
import { ajcSources } from './ajc/sources';
import { fbuSources } from './fbu/sources';
import { ushSources } from './ush/sources';
import { vnuumpSources } from './vnuump/sources';
import { ltvuniSources } from './ltvuni/sources';
import { fpfuSources } from './fpfu/sources';
import { uflsudnSources } from './uflsudn/sources';
import { hcmupesSources } from './hcmupes/sources';
import { thanhdoSources } from './thanhdo/sources';
import { uedudnSources } from './uedudn/sources';
import { dainamSources } from './dainam/sources';
import { utmSources } from './utm/sources';
import { hpu2Sources } from './hpu2/sources';
import { vnulawSources } from './vnulaw/sources';
import { hustSources } from './hust/sources';
import { uttSources } from './utt/sources';
import { hmuSources } from './hmu/sources';
import { hauiSources } from './haui/sources';
import { aofSources } from './aof/sources';
import { bavSources } from './bav/sources';
import { phenikaaSources } from './phenikaa/sources';
import { houSources } from './hou/sources';
import { lhuSources } from './lhu/sources';
import { hnmuSources } from './hnmu/sources';
import { cmcuSources } from './cmcu/sources';
import { hdiuSources } from './hdiu/sources';
import { tluSources } from './tlu/sources';
import { hpmuSources } from './hpmu/sources';
import { vnuebSources } from './vnueb/sources';
import { vnuedSources } from './vnued/sources';
import { vnuuetSources } from './vnuuet/sources';
import { vnuhusSources } from './vnuhus/sources';
import { vnusshSources } from './vnussh/sources';
import { hucSources } from './huc/sources';
import { hunreSources } from './hunre/sources';
import { humpSources } from './hump/sources';
import { tvuSources } from './tvu/sources';
import { qnuSources } from './qnu/sources';
import { qbuSources } from './qbu/sources';
import { pctuSources } from './pctu/sources';
import { pvuSources } from './pvu/sources';
import { tnutSources } from './tnut/sources';
import { htuSources } from './htu/sources';
import { dumtpSources } from './dumtp/sources';
import { tuebaSources } from './tueba/sources';
import { tumpSources } from './tump/sources';
import { ctuetSources } from './ctuet/sources';
import { dnuSources } from './dnu/sources';
import { qnamuSources } from './qnamu/sources';
import { tmuSources } from './tmu/sources';

function withSchoolId(schoolId: string, sources: Omit<AdmissionSource, 'schoolId'>[]): AdmissionSource[] {
  return sources.map((source) => ({ ...source, schoolId }));
}

export const hcmutSourceRegistry: AdmissionSource[] = withSchoolId('hcmut', hcmutSources);
export const uehSourceRegistry: AdmissionSource[] = withSchoolId('ueh', uehSources);
export const uelSourceRegistry: AdmissionSource[] = withSchoolId('uel', uelSources);
export const uitSourceRegistry: AdmissionSource[] = withSchoolId('uit', uitSources);
export const hcmusSourceRegistry: AdmissionSource[] = withSchoolId('hcmus', hcmusSources);
export const usshSourceRegistry: AdmissionSource[] = withSchoolId('ussh', usshSources);
export const uhsSourceRegistry: AdmissionSource[] = withSchoolId('uhs', uhsSources);
export const iuSourceRegistry: AdmissionSource[] = withSchoolId('iu', iuSources);
export const aguSourceRegistry: AdmissionSource[] = withSchoolId('agu', aguSources);
export const hcmueSourceRegistry: AdmissionSource[] = withSchoolId('hcmue', hcmueSources);
export const hcmuteSourceRegistry: AdmissionSource[] = withSchoolId('hcmute', hcmuteSources);
export const tdtuSourceRegistry: AdmissionSource[] = withSchoolId('tdtu', tdtuSources);
export const huflitSourceRegistry: AdmissionSource[] = withSchoolId('huflit', huflitSources);
export const hutechSourceRegistry: AdmissionSource[] = withSchoolId('hutech', hutechSources);
export const ufmSourceRegistry: AdmissionSource[] = withSchoolId('ufm', ufmSources);
export const hcmulawSourceRegistry: AdmissionSource[] = withSchoolId('hcmulaw', hcmulawSources);
export const vluSourceRegistry: AdmissionSource[] = withSchoolId('vlu', vluSources);
export const iuhSourceRegistry: AdmissionSource[] = withSchoolId('iuh', iuhSources);
export const umpSourceRegistry: AdmissionSource[] = withSchoolId('ump', umpSources);
export const ftuSourceRegistry: AdmissionSource[] = withSchoolId('ftu', ftuSources);
export const ptitSourceRegistry: AdmissionSource[] = withSchoolId('ptit', ptitSources);
export const neuSourceRegistry: AdmissionSource[] = withSchoolId('neu', neuSources);
export const hubSourceRegistry: AdmissionSource[] = withSchoolId('hub', hubSources);
export const huitSourceRegistry: AdmissionSource[] = withSchoolId('huit', huitSources);
export const nttuSourceRegistry: AdmissionSource[] = withSchoolId('nttu', nttuSources);
export const hsuSourceRegistry: AdmissionSource[] = withSchoolId('hsu', hsuSources);
export const uefSourceRegistry: AdmissionSource[] = withSchoolId('uef', uefSources);
export const ctuSourceRegistry: AdmissionSource[] = withSchoolId('ctu', ctuSources);
export const tdmuSourceRegistry: AdmissionSource[] = withSchoolId('tdmu', tdmuSources);
export const hiuSourceRegistry: AdmissionSource[] = withSchoolId('hiu', hiuSources);
export const ouSourceRegistry: AdmissionSource[] = withSchoolId('ou', ouSources);
export const sguSourceRegistry: AdmissionSource[] = withSchoolId('sgu', sguSources);
export const hnueSourceRegistry: AdmissionSource[] = withSchoolId('hnue', hnueSources);
export const vinhuniSourceRegistry: AdmissionSource[] = withSchoolId('vinhuni', vinhuniSources);
export const utcSourceRegistry: AdmissionSource[] = withSchoolId('utc', utcSources);
export const hupSourceRegistry: AdmissionSource[] = withSchoolId('hup', hupSources);
export const vkuSourceRegistry: AdmissionSource[] = withSchoolId('vku', vkuSources);
export const hceSourceRegistry: AdmissionSource[] = withSchoolId('hce', hceSources);
export const hulSourceRegistry: AdmissionSource[] = withSchoolId('hul', hulSources);
export const huscSourceRegistry: AdmissionSource[] = withSchoolId('husc', huscSources);
export const huafSourceRegistry: AdmissionSource[] = withSchoolId('huaf', huafSources);
export const hueeduSourceRegistry: AdmissionSource[] = withSchoolId('hueedu', hueeduSources);
export const ctumpSourceRegistry: AdmissionSource[] = withSchoolId('ctump', ctumpSources);
export const vnuaSourceRegistry: AdmissionSource[] = withSchoolId('vnua', vnuaSources);
export const pntuSourceRegistry: AdmissionSource[] = withSchoolId('pntu', pntuSources);
export const apdSourceRegistry: AdmissionSource[] = withSchoolId('apd', apdSources);
export const bvuSourceRegistry: AdmissionSource[] = withSchoolId('bvu', bvuSources);
export const bmtuSourceRegistry: AdmissionSource[] = withSchoolId('bmtu', bmtuSources);
export const hcaSourceRegistry: AdmissionSource[] = withSchoolId('hca', hcaSources);
export const naemSourceRegistry: AdmissionSource[] = withSchoolId('naem', naemSources);
export const tbuSourceRegistry: AdmissionSource[] = withSchoolId('tbu', tbuSources);
export const uhdSourceRegistry: AdmissionSource[] = withSchoolId('uhd', uhdSources);
export const ajcSourceRegistry: AdmissionSource[] = withSchoolId('ajc', ajcSources);
export const fbuSourceRegistry: AdmissionSource[] = withSchoolId('fbu', fbuSources);
export const ushSourceRegistry: AdmissionSource[] = withSchoolId('ush', ushSources);
export const vnuumpSourceRegistry: AdmissionSource[] = withSchoolId('vnuump', vnuumpSources);
export const ltvuniSourceRegistry: AdmissionSource[] = withSchoolId('ltvuni', ltvuniSources);
export const fpfuSourceRegistry: AdmissionSource[] = withSchoolId('fpfu', fpfuSources);
export const uflsudnSourceRegistry: AdmissionSource[] = withSchoolId('uflsudn', uflsudnSources);
export const hcmupesSourceRegistry: AdmissionSource[] = withSchoolId('hcmupes', hcmupesSources);
export const thanhdoSourceRegistry: AdmissionSource[] = withSchoolId('thanhdo', thanhdoSources);
export const uedudnSourceRegistry: AdmissionSource[] = withSchoolId('uedudn', uedudnSources);
export const dainamSourceRegistry: AdmissionSource[] = withSchoolId('dainam', dainamSources);
export const utmSourceRegistry: AdmissionSource[] = withSchoolId('utm', utmSources);
export const hpu2SourceRegistry: AdmissionSource[] = withSchoolId('hpu2', hpu2Sources);
export const vnulawSourceRegistry: AdmissionSource[] = withSchoolId('vnulaw', vnulawSources);
export const hustSourceRegistry: AdmissionSource[] = withSchoolId('hust', hustSources);
export const uttSourceRegistry: AdmissionSource[] = withSchoolId('utt', uttSources);
export const hmuSourceRegistry: AdmissionSource[] = withSchoolId('hmu', hmuSources);
export const hauiSourceRegistry: AdmissionSource[] = withSchoolId('haui', hauiSources);
export const aofSourceRegistry: AdmissionSource[] = withSchoolId('aof', aofSources);
export const bavSourceRegistry: AdmissionSource[] = withSchoolId('bav', bavSources);
export const phenikaaSourceRegistry: AdmissionSource[] = withSchoolId('phenikaa', phenikaaSources);
export const houSourceRegistry: AdmissionSource[] = withSchoolId('hou', houSources);
export const lhuExactSourceRegistry: AdmissionSource[] = withSchoolId('lhu', lhuSources);
export const hnmuSourceRegistry: AdmissionSource[] = withSchoolId('hnmu', hnmuSources);
export const cmcuSourceRegistry: AdmissionSource[] = withSchoolId('cmcu', cmcuSources);
export const hdiuSourceRegistry: AdmissionSource[] = withSchoolId('hdiu', hdiuSources);
export const tluSourceRegistry: AdmissionSource[] = withSchoolId('tlu', tluSources);
export const hpmuSourceRegistry: AdmissionSource[] = withSchoolId('hpmu', hpmuSources);
export const vnuebSourceRegistry: AdmissionSource[] = withSchoolId('vnueb', vnuebSources);
export const vnuedSourceRegistry: AdmissionSource[] = withSchoolId('vnued', vnuedSources);
export const vnuuetSourceRegistry: AdmissionSource[] = withSchoolId('vnuuet', vnuuetSources);
export const vnuhusSourceRegistry: AdmissionSource[] = withSchoolId('vnuhus', vnuhusSources);
export const vnusshSourceRegistry: AdmissionSource[] = withSchoolId('vnussh', vnusshSources);
export const hucSourceRegistry: AdmissionSource[] = withSchoolId('huc', hucSources);
export const hunreSourceRegistry: AdmissionSource[] = withSchoolId('hunre', hunreSources);
export const humpSourceRegistry: AdmissionSource[] = withSchoolId('hump', humpSources);
export const tvuSourceRegistry: AdmissionSource[] = withSchoolId('tvu', tvuSources);
export const qnuSourceRegistry: AdmissionSource[] = withSchoolId('qnu', qnuSources);
export const qbuSourceRegistry: AdmissionSource[] = withSchoolId('qbu', qbuSources);
export const pctuSourceRegistry: AdmissionSource[] = withSchoolId('pctu', pctuSources);
export const pvuSourceRegistry: AdmissionSource[] = withSchoolId('pvu', pvuSources);
export const tnutSourceRegistry: AdmissionSource[] = withSchoolId('tnut', tnutSources);
export const htuSourceRegistry: AdmissionSource[] = withSchoolId('htu', htuSources);
export const dumtpSourceRegistry: AdmissionSource[] = withSchoolId('dumtp', dumtpSources);
export const tuebaSourceRegistry: AdmissionSource[] = withSchoolId('tueba', tuebaSources);
export const tumpSourceRegistry: AdmissionSource[] = withSchoolId('tump', tumpSources);
export const ctuetSourceRegistry: AdmissionSource[] = withSchoolId('ctuet', ctuetSources);
export const dnuSourceRegistry: AdmissionSource[] = withSchoolId('dnu', dnuSources);
export const qnamuSourceRegistry: AdmissionSource[] = withSchoolId('qnamu', qnamuSources);
export const tmuSourceRegistry: AdmissionSource[] = withSchoolId('tmu', tmuSources);

export const schoolSourceRegistries: Record<string, AdmissionSource[]> = {
  hcmut: hcmutSourceRegistry,
  ueh: uehSourceRegistry,
  uel: uelSourceRegistry,
  uit: uitSourceRegistry,
  hcmus: hcmusSourceRegistry,
  ussh: usshSourceRegistry,
  uhs: uhsSourceRegistry,
  iu: iuSourceRegistry,
  agu: aguSourceRegistry,
  hcmue: hcmueSourceRegistry,
  hcmute: hcmuteSourceRegistry,
  tdtu: tdtuSourceRegistry,
  huflit: huflitSourceRegistry,
  hutech: hutechSourceRegistry,
  ufm: ufmSourceRegistry,
  hcmulaw: hcmulawSourceRegistry,
  vlu: vluSourceRegistry,
  iuh: iuhSourceRegistry,
  ump: umpSourceRegistry,
  ftu: ftuSourceRegistry,
  ptit: ptitSourceRegistry,
  neu: neuSourceRegistry,
  hub: hubSourceRegistry,
  huit: huitSourceRegistry,
  nttu: nttuSourceRegistry,
  hsu: hsuSourceRegistry,
  uef: uefSourceRegistry,
  ctu: ctuSourceRegistry,
  tdmu: tdmuSourceRegistry,
  hiu: hiuSourceRegistry,
  ou: ouSourceRegistry,
  sgu: sguSourceRegistry,
  hnue: hnueSourceRegistry,
  vinhuni: vinhuniSourceRegistry,
  utc: utcSourceRegistry,
  vku: vkuSourceRegistry,
  hup: hupSourceRegistry,
  hce: hceSourceRegistry,
  hul: hulSourceRegistry,
  husc: huscSourceRegistry,
  huaf: huafSourceRegistry,
  hueedu: hueeduSourceRegistry,
  ctump: ctumpSourceRegistry,
  vnua: vnuaSourceRegistry,
  pntu: pntuSourceRegistry,
  apd: apdSourceRegistry,
  bvu: bvuSourceRegistry,
  bmtu: bmtuSourceRegistry,
  hca: hcaSourceRegistry,
  naem: naemSourceRegistry,
  tbu: tbuSourceRegistry,
  uhd: uhdSourceRegistry,
  ajc: ajcSourceRegistry,
  fbu: fbuSourceRegistry,
  ush: ushSourceRegistry,
  vnuump: vnuumpSourceRegistry,
  ltvuni: ltvuniSourceRegistry,
  fpfu: fpfuSourceRegistry,
  uflsudn: uflsudnSourceRegistry,
  hcmupes: hcmupesSourceRegistry,
  thanhdo: thanhdoSourceRegistry,
  uedudn: uedudnSourceRegistry,
  dainam: dainamSourceRegistry,
  utm: utmSourceRegistry,
  utt: uttSourceRegistry,
  hmu: hmuSourceRegistry,
  haui: hauiSourceRegistry,
  aof: aofSourceRegistry,
  bav: bavSourceRegistry,
  phenikaa: phenikaaSourceRegistry,
  hou: houSourceRegistry,
  lhu: lhuExactSourceRegistry,
  hnmu: hnmuSourceRegistry,
  cmcu: cmcuSourceRegistry,
  hdiu: hdiuSourceRegistry,
  tlu: tluSourceRegistry,
  hpmu: hpmuSourceRegistry,
  vnueb: vnuebSourceRegistry,
  vnued: vnuedSourceRegistry,
  vnuuet: vnuuetSourceRegistry,
  vnuhus: vnuhusSourceRegistry,
  vnussh: vnusshSourceRegistry,
  huc: hucSourceRegistry,
  hunre: hunreSourceRegistry,
  hump: humpSourceRegistry,
  tvu: tvuSourceRegistry,
  qnu: qnuSourceRegistry,
  qbu: qbuSourceRegistry,
  pctu: pctuSourceRegistry,
  pvu: pvuSourceRegistry,
  tnut: tnutSourceRegistry,
  htu: htuSourceRegistry,
  dumtp: dumtpSourceRegistry,
  tueba: tuebaSourceRegistry,
  tump: tumpSourceRegistry,
  ctuet: ctuetSourceRegistry,
  dnu: dnuSourceRegistry,
  qnamu: qnamuSourceRegistry,
  tmu: tmuSourceRegistry,
};

export const allAdmissionSources: AdmissionSource[] = [
  ...hcmutSourceRegistry,
  ...uehSourceRegistry,
  ...uelSourceRegistry,
  ...uitSourceRegistry,
  ...hcmusSourceRegistry,
  ...usshSourceRegistry,
  ...uhsSourceRegistry,
  ...iuSourceRegistry,
  ...aguSourceRegistry,
  ...hcmueSourceRegistry,
  ...hcmuteSourceRegistry,
  ...tdtuSourceRegistry,
  ...huflitSourceRegistry,
  ...hutechSourceRegistry,
  ...ufmSourceRegistry,
  ...hcmulawSourceRegistry,
  ...vluSourceRegistry,
  ...iuhSourceRegistry,
  ...umpSourceRegistry,
  ...ftuSourceRegistry,
  ...ptitSourceRegistry,
  ...neuSourceRegistry,
  ...hubSourceRegistry,
  ...huitSourceRegistry,
  ...nttuSourceRegistry,
  ...hsuSourceRegistry,
  ...uefSourceRegistry,
  ...ctuSourceRegistry,
  ...tdmuSourceRegistry,
  ...hiuSourceRegistry,
  ...ouSourceRegistry,
  ...sguSourceRegistry,
  ...hnueSourceRegistry,
  ...vinhuniSourceRegistry,
  ...utcSourceRegistry,
  ...vkuSourceRegistry,
  ...hupSourceRegistry,
  ...hceSourceRegistry,
  ...hulSourceRegistry,
  ...huscSourceRegistry,
  ...huafSourceRegistry,
  ...hueeduSourceRegistry,
  ...ctumpSourceRegistry,
  ...vnuaSourceRegistry,
  ...pntuSourceRegistry,
  ...apdSourceRegistry,
  ...bvuSourceRegistry,
  ...bmtuSourceRegistry,
  ...hcaSourceRegistry,
  ...naemSourceRegistry,
  ...tbuSourceRegistry,
  ...uhdSourceRegistry,
  ...ajcSourceRegistry,
  ...fbuSourceRegistry,
  ...ushSourceRegistry,
  ...vnuumpSourceRegistry,
  ...ltvuniSourceRegistry,
  ...fpfuSourceRegistry,
  ...uflsudnSourceRegistry,
  ...hcmupesSourceRegistry,
  ...thanhdoSourceRegistry,
  ...uedudnSourceRegistry,
  ...dainamSourceRegistry,
  ...utmSourceRegistry,
  ...uttSourceRegistry,
  ...hpu2SourceRegistry,
  ...vnulawSourceRegistry,
  ...hustSourceRegistry,
  ...hmuSourceRegistry,
  ...hauiSourceRegistry,
  ...aofSourceRegistry,
  ...bavSourceRegistry,
  ...phenikaaSourceRegistry,
  ...houSourceRegistry,
  ...lhuExactSourceRegistry,
  ...hnmuSourceRegistry,
  ...cmcuSourceRegistry,
  ...hdiuSourceRegistry,
  ...tluSourceRegistry,
  ...hpmuSourceRegistry,
  ...vnuebSourceRegistry,
  ...vnuedSourceRegistry,
  ...vnuuetSourceRegistry,
  ...vnuhusSourceRegistry,
  ...vnusshSourceRegistry,
  ...hucSourceRegistry,
  ...hunreSourceRegistry,
  ...humpSourceRegistry,
  ...tvuSourceRegistry,
  ...qnuSourceRegistry,
  ...qbuSourceRegistry,
  ...pctuSourceRegistry,
  ...pvuSourceRegistry,
  ...tnutSourceRegistry,
  ...htuSourceRegistry,
  ...dumtpSourceRegistry,
  ...tuebaSourceRegistry,
  ...tumpSourceRegistry,
  ...ctuetSourceRegistry,
  ...dnuSourceRegistry,
  ...qnamuSourceRegistry,
  ...tmuSourceRegistry,
];
