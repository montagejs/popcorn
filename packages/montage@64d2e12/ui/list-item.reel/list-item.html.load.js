montageDefine("64d2e12","ui/list-item.reel/list-item.html",{"text":"<!DOCTYPE html><html manifest=../../../../manifest.appcache><head><style>.ListItem{padding-left:8px;padding-right:8px;border-radius:0;position:relative;color:#000;background-color:#fff;min-height:2.75em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden;border:1px solid #c8c7cc;box-sizing:border-box;-webkit-transition:background-color .2s linear;transition:background-color .2s linear}.ListItem.selected{background-color:#d9d9d9}.ListItem.active{background-color:#e9e9e9}.ListItem.is-expandable:after{content:\"\\203A\";position:absolute;right:16px;top:0;bottom:0;font-size:2em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#C7C7CC;margin-top:-6px}.ListItem.is-expandable .ListItem-text{margin-right:27px}.ListItem.is-expandable.has-value .ListItem-text{margin-right:0}.ListItem.is-expandable .ListItem-value{font-size:.5em;margin-right:35px}.ListItem .ListItem-icon>*{height:24px;width:24px;margin:8px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ListItem .ListItem-icon .montage-image{position:relative;height:24px;width:24px;display:inline-block}.ListItem .ListItem-text{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;overflow:hidden}.ListItem .ListItem-text .ListItem-description,.ListItem .ListItem-text .ListItem-label{padding-left:8px;padding-right:8px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-box-flex:1;-ms-flex:1;flex:1}.ListItem .ListItem-text .ListItem-label{font-size:1em;font-weight:400}.ListItem .ListItem-text .ListItem-description{font-size:.85em;color:#8e9093;text-align:right;max-width:35%}.ListItem.description-bottom .ListItem-text{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}.ListItem.description-bottom .ListItem-text .ListItem-description,.ListItem.description-bottom .ListItem-text .ListItem-label{margin:0 0 2px;max-width:90%}.ListItem.description-bottom .ListItem-text .ListItem-description{text-align:left}.ListItem .ListItem-value{font-size:.6em;margin-right:8px;margin-left:8px}</style><script type=text/montage-serialization>{\"owner\":{\"values\":{\"element\":{\"#\":\"owner\"},\"_valuePlaceholderComponent\":{\"@\":\"placeholderValue\"},\"_montageIconComponentModule\":{\"%\":\"../image.reel\"},\"_montageToogleComponentModule\":{\"%\":\"../toggle.reel\"},\"classList.has('has-value')\":{\"<-\":\"@owner.__value.defined()\"},\"classList.has('active')\":{\"<-\":\"@owner.active\"},\"classList.has('selected')\":{\"<-\":\"@owner.selected\"},\"classList.has('is-expandable')\":{\"<-\":\"@owner._isExpandable\"},\"classList.has('description-bottom')\":{\"<-\":\"@owner._descriptionPosition == 'bottom'\"}}},\"placeholder\":{\"prototype\":\"../placeholder.reel\",\"values\":{\"element\":{\"#\":\"icon\"},\"componentModule\":{\"<-\":\"@owner._montageIconComponentModule.id == @owner._iconComponentModule.id && !@owner._iconSrc ? null : @owner._iconComponentModule\"},\"component.src\":{\"<-\":\"@owner._iconSrc\"}}},\"label\":{\"prototype\":\"../text.reel\",\"values\":{\"element\":{\"#\":\"label\"},\"value\":{\"<-\":\"@owner._label\"}}},\"description\":{\"prototype\":\"../text.reel\",\"values\":{\"element\":{\"#\":\"description\"},\"value\":{\"<-\":\"@owner._description\"},\"hidden\":{\"<-\":\"!@owner._description\"}}},\"placeholderValue\":{\"prototype\":\"../placeholder.reel\",\"values\":{\"element\":{\"#\":\"value\"},\"componentModule\":{\"<-\":\"@owner.__value.defined() ? @owner._toggleComponentModule : null\"},\"component.checked\":{\"<-\":\"@owner.__value\"}}}}</script></head><body><div data-montage-id=owner class=ListItem><div data-montage-id=icon class=ListItem-icon></div><div class=ListItem-text><div data-montage-id=label class=ListItem-label></div><div data-montage-id=description class=ListItem-description></div></div><div data-montage-id=value class=ListItem-value></div></div></body></html>"})