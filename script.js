console.log('extension loaded');

$(document).ready(function(){
  $(document).on('click', '.search-result-newProjectAlert', function(e){
    e.preventDefault();
    
    axios.get('https://www.freelancer.com/api/projects/0.1/projects/active/?compact=true&enterprise_metadata_field_details=true&forceShowLocationDetails=false&full_description=true&job_details=true&jobs%5B%5D=335&jobs%5B%5D=3&jobs%5B%5D=669&jobs%5B%5D=759&jobs%5B%5D=1126&jobs%5B%5D=704&jobs%5B%5D=598&jobs%5B%5D=69&jobs%5B%5D=90&jobs%5B%5D=502&jobs%5B%5D=500&jobs%5B%5D=9&keywords=&languages%5B%5D=de&languages%5B%5D=en&languages%5B%5D=es&languages%5B%5D=fr&languages%5B%5D=it&languages%5B%5D=ja&languages%5B%5D=ko&languages%5B%5D=pt&limit=10&offset=0&project_types%5B%5D=fixed&project_types%5B%5D=hourly&query=&sort_field=submitdate&upgrade_details=true&user_details=true&user_employer_reputation=true&user_status=true')
    .then(function(res){
      const data = res.data.result;
      const users = data.users;
      const projects = data.projects.map(function(el){
        return {
          ...el,
          owner_info: users[el.owner_id]
        };
      });
      
      const container = $('.search-result-list').empty();
      const newContent = projects.map(function(el){
        return `
          <li ng-repeat="project in search.results.projects">
            <a class="search-result-link" href="/projects/${el.seo_url}" target="_blank">
              <div class="search-result-item">
                <fl-project-tile project="project" user="search.user" tracking-event-section="search.trackingEventSection"
                  display-location="search.searchType === 'projects'" last-tracking-event="search.lastTrackingEvent"
                  index="$index + search.filters.common.offset + 1">
                  <figure class="info-card-iconBox">
                    <span class="Icon">
                      <fl-icon name="ui-fixed-project">
                        ${(function(){
                          if(el.type === 'fixed'){
                            return `
                              <svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 15.5v1c0 1.103.897 2 2 2h9v2H7v2h10v-2h-4v-2h9c1.103 0 2-.897 2-2v-1H0zm24-1v-11c0-1.103-.897-2-2-2H2c-1.103 0-2 .897-2 2v11h24z" fill="#0087E0"></path></svg>
                            `;
                          }
                          return `
                            <svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.384 0 0 5.384 0 12s5.384 12 12 12 12-5.384 12-12S18.616 0 12 0zm3.26 15.776l-4.593-3.063v-7.38h2.666v5.954l3.407 2.27-1.48 2.219z" fill="#0087E0"></path></svg>
                          `;
                        })()}
                      </fl-icon>
                    </span>
                  </figure>
                  <div class="info-card-inner">
                    <h2 class="info-card-title">
                      ${el.title}
                    </h2>
                    <p class="info-card-description">
                      ${el.description}
                    </p>
                    <div class="info-card-grid">
                      <div class="info-card-details info-card-grid-item">
                        <span class="Icon Icon--small info-card--iconSpace" title="Project status"
                          i18n-title-id="497c102c4f5c881a850f44b3e73975dd" i18n-title-msg="Project status" i18n-id="">
                          <fl-icon name="ui-hourglass-2">
                            <svg class="Icon-image" width="24" height="24"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <g fill="none">
                                <path
                                  d="M20.5 3.805V1.2c0-.662-.536-1.2-1.196-1.2H4.946C4.286 0 3.75.538 3.75 1.2v2.606c0 .948.383 1.876 1.052 2.546L10.433 12l-5.631 5.65a3.577 3.577 0 0 0-1.052 2.545V22.8c0 .662.536 1.2 1.196 1.2h14.358c.66 0 1.196-.538 1.196-1.2v-2.605a3.58 3.58 0 0 0-1.052-2.547L13.817 12l5.631-5.648A3.63 3.63 0 0 0 20.5 3.805z"
                                  fill="#363F4D"></path>
                                <path fill="#FFF" d="M8.536 20.4l3.589-3.6 3.59 3.6z"></path>
                              </g>
                            </svg>
                          </fl-icon>
                        </span>
                        <time class="info-card-details-item timeago">
                          ${jQuery.timeago(new Date(el.time_submitted * 1000))}
                        </time>
                        <span class="info-card-details-item">
                          <span class="info-card-bids" i18n-id="4384ecda9eae12054e8c61b20faf9ab0"
                            i18n-msg="— ${el.bid_stats.bid_count}">
                            — ${el.bid_stats.bid_count} bids
                          </span>
                        </span>
                      </div>
                      <div class="info-card-details info-card-details--hasTooltip info-card-grid-item">
                        <img src="https://www.f-cdn.com/assets/main/en/assets/flags/${countries.find(function(country){
                          return country.name === el.owner_info.location.country.name;
                        }).code.toLowerCase()}.svg" title="${el.owner_info.location.country.name}" class="fh-flag-image" width="20" style="margin-right: 8px;">
                        <span class="Icon Icon--small info-card--iconSpace" title="Contest owner"
                          i18n-title-id="d4a1ba56edb003f1e379139218be68e7" i18n-title-msg="Contest owner" i18n-id="">
                          <fl-icon name="ui-user-non-verified">
                            <svg class="Icon-image" width="24" height="24"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path
                                d="M12.125 13.5C5.87 13.5 1.5 17.2 1.5 22.5V24h21.25v-1.5c0-5.3-4.368-9-10.625-9zm0-2.833c2.93 0 5.313-2.394 5.313-5.334 0-2.94-2.383-5.333-5.313-5.333-2.93 0-5.313 2.393-5.313 5.333 0 2.94 2.384 5.334 5.313 5.334z"
                                fill="#363F4D"></path>
                            </svg></fl-icon>
                        </span>
                        <span>
                          ${(function(){
                            if(el.owner_info.employer_reputation.entire_history.reviews > 0){
                              let score = (Math.round(el.owner_info.employer_reputation.entire_history.overall * 10) / 10).toString();
                              if(score.length === 1) score = `${score}.0`;

                              return `
                                <span class="Tooltip Tooltip--bottom" data-tooltip="${el.owner_info.employer_reputation.entire_history.complete} jobs completed">
                                  <div class="Rating Rating--labeled info-card-rating" data-star_rating="${score}">
                                    <span class="Rating-total">
                                      <span class="Rating-progress"></span>
                                    </span>
                                  </div>
                                  (${Math.round(el.owner_info.employer_reputation.earnings_score * 10) / 10} spent / ${el.owner_info.employer_reputation.entire_history.reviews} reviews)
                                </span>
                              `;
                            }
                            return `
                              <span>
                                No jobs completed yet
                              </span>
                            `;
                          })()}
                        </span>
                      </div>
                      <div class="info-card-details info-card-grid-item" style="display: inline-block;">
                        <fl-icon name="ui-tag">
                          <svg version="1.1" id="Capa_1" class="Icon-image"
                            style="
                              width:16px;
                              height:16px;
                              fill: ${el.owner_info.status.payment_verified ? '#30B478' : '#ccc'}
                            "
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 236.988 236.988" xml:space="preserve"><polygon points="198.098,24.326 87.543,134.881 38.891,86.229 0,125.121 87.543,212.662 236.988,63.217 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        </fl-icon>
                        <span style="margin-left: 5px;">
                          ${el.owner_info.status.payment_verified ? 'Payment verified' : 'Payment not verified'}
                        </span>
                      </div>
                      <div class="info-card-details info-card-grid-item" style="display: inline-block;">
                        <fl-icon name="ui-tag">
                          ${(function(){
                            if(el.owner_info.role === 'employer'){
                              return `
                                <svg version="1.1" id="Capa_1" class="Icon-image"
                                  style="
                                    width:16px;
                                    height:16px;
                                  "
                                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 318.543 318.543" style="enable-background:new 0 0 318.543 318.543;" xml:space="preserve"><g>	<g>		<g>			<path style="fill:#348789;" d="M303.463,253.096c-11.151-37.754-67.121-33.566-91.279-44.408				c-24.157-10.842-20.386-47.219-23.449-53.548h-58.932c-3.058,6.329,0.714,42.711-23.449,53.548				c-24.157,10.842-80.133,6.655-91.279,44.408c-6.149,20.824-5.857,27.193-7.554,50.26c0,0,76.8,15.187,150.014,15.187				s153.488-15.187,153.488-15.187C309.319,280.283,309.612,273.921,303.463,253.096z"/>			<g>				<path style="fill:#44ADA0;" d="M15.811,250.854c-0.264,0.731-0.506,1.478-0.736,2.243c-0.444,1.501-0.849,2.923-1.231,4.283					h1.962v-6.526H15.811z"/>				<path style="fill:#44ADA0;" d="M10.837,269.851c-1.546,7.948-2.007,14.63-2.715,24.95h7.683v-24.95H10.837z"/>				<rect x="40.755" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="40.755" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M40.755,307.273v1.652c3.901,0.579,8.071,1.175,12.472,1.771v-3.429H40.755V307.273z"/>				<path style="fill:#44ADA0;" d="M90.655,219.952v-6.537c-3.946,0.866-8.144,1.664-12.472,2.496v4.047h12.472V219.952z"/>				<rect x="78.177" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="78.177" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M78.177,307.273v6.497c4.058,0.444,8.223,0.877,12.472,1.287v-7.779H78.177V307.273z"/>				<path style="fill:#44ADA0;" d="M115.599,219.952h12.472v-24.95h-7.352c-1.405,2.563-3.091,4.963-5.12,7.11V219.952z"/>				<rect x="115.599" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M128.077,182.529V166.28c-0.5,4.783-1.186,10.505-2.63,16.255h2.63V182.529z"/>				<path style="fill:#44ADA0;" d="M115.599,307.273v9.808c4.126,0.27,8.285,0.511,12.472,0.714v-10.522H115.599z"/>				<rect x="115.599" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M153.027,307.273v11.252c1.501,0.011,3.007,0.017,4.508,0.017c2.647,0,5.306-0.022,7.964-0.056					v-11.213H153.027z"/>				<rect x="153.027" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="153.027" y="195.007" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="153.027" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="153.027" y="155.14" style="fill:#44ADA0;" width="12.472" height="27.395"/>				<path style="fill:#44ADA0;" d="M193.091,182.529c-1.461-5.806-2.147-11.59-2.647-16.401v16.401H193.091z"/>				<path style="fill:#44ADA0;" d="M190.449,307.273v10.359c4.182-0.219,8.347-0.472,12.472-0.759v-9.6H190.449z"/>				<path style="fill:#44ADA0;" d="M190.449,219.952h12.472V202.1c-2.023-2.141-3.704-4.541-5.104-7.093h-7.369v24.945H190.449z"/>				<rect x="190.449" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="190.449" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M227.871,307.273v7.526c4.244-0.41,8.408-0.843,12.472-1.287v-6.239H227.871z"/>				<rect x="227.871" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M240.343,219.952v-4.047c-4.328-0.826-8.526-1.624-12.472-2.496v6.542h12.472V219.952z"/>				<rect x="227.871" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<rect x="265.293" y="269.851" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M265.293,307.273v3.209c4.401-0.585,8.571-1.169,12.472-1.737v-1.473L265.293,307.273					L265.293,307.273z"/>				<rect x="265.293" y="232.429" style="fill:#44ADA0;" width="12.472" height="24.95"/>				<path style="fill:#44ADA0;" d="M304.694,257.374c-0.377-1.36-0.787-2.782-1.231-4.283c-0.23-0.781-0.483-1.54-0.748-2.288v6.565					h1.978L304.694,257.374L304.694,257.374z"/>				<path style="fill:#44ADA0;" d="M302.715,294.796h7.7c-0.708-10.314-1.175-16.997-2.715-24.95h-4.986					C302.715,269.846,302.715,294.796,302.715,294.796z"/>				<rect x="165.499" y="182.529" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="128.077" y="182.529" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#76C4BB;" d="M128.077,182.529h-2.63c-1.074,4.272-2.574,8.555-4.721,12.472h7.352v-12.472H128.077z"/>				<rect x="153.027" y="182.529" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<path style="fill:#76C4BB;" d="M197.818,195.007c-2.153-3.918-3.648-8.2-4.721-12.472h-2.647v12.472H197.818z"/>				<path style="fill:#44ADA0;" d="M29.716,232.429h11.039v-6.363C36.787,227.848,33.066,229.939,29.716,232.429z"/>				<rect x="202.921" y="219.952" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#44ADA0;" d="M240.343,232.429h24.95v-10.898c-1.922-0.568-3.867-1.09-5.823-1.579h-19.127V232.429z"/>				<rect x="90.655" y="219.952" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="128.077" y="219.952" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#44ADA0;" d="M53.233,232.429h24.95v-12.472h-19.11c-1.962,0.495-3.912,1.017-5.84,1.585					C53.233,221.542,53.233,232.429,53.233,232.429z"/>				<path style="fill:#44ADA0;" d="M288.821,232.429c-3.355-2.49-7.082-4.581-11.056-6.368v6.368H288.821z"/>				<rect x="165.499" y="219.952" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#76C4BB;" d="M53.233,221.537c-4.317,1.27-8.515,2.748-12.472,4.525v6.363h12.472V221.537z"/>				<rect x="78.177" y="219.952" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="115.599" y="219.952" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="153.027" y="219.952" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="190.449" y="219.952" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="227.871" y="219.952" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<path style="fill:#76C4BB;" d="M265.293,232.429h12.472v-6.368c-3.957-1.776-8.156-3.254-12.472-4.525L265.293,232.429					L265.293,232.429z"/>				<rect x="277.765" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="15.811" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="202.921" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="240.343" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="53.233" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="165.499" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="90.655" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="128.077" y="257.374" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#76C4BB;" d="M15.811,257.374h-1.967c-1.326,4.766-2.288,8.763-3.007,12.472h4.969v-12.472L15.811,257.374					L15.811,257.374z"/>				<rect x="40.755" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="78.177" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="115.599" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="153.027" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="190.449" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="227.871" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="265.293" y="257.374" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<path style="fill:#76C4BB;" d="M302.715,269.851h4.986c-0.719-3.715-1.681-7.706-3.007-12.472h-1.978v12.472H302.715z"/>				<path style="fill:#44ADA0;" d="M302.715,294.796h-24.95v12.472h9.853c6.115-0.944,11.224-1.787,15.091-2.445v-10.027H302.715z"					/>				<path style="fill:#44ADA0;" d="M40.755,294.796H15.811v10.083c3.676,0.652,8.482,1.473,14.215,2.389h10.735v-12.472					L40.755,294.796L40.755,294.796z"/>				<rect x="202.921" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="53.233" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="128.077" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="90.655" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="165.499" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<rect x="240.343" y="294.796" style="fill:#44ADA0;" width="24.95" height="12.472"/>				<path style="fill:#76C4BB;" d="M7.52,303.356c0,0,2.968,0.585,8.29,1.529v-10.083H8.122					C7.942,297.392,7.751,300.22,7.52,303.356z"/>				<rect x="40.755" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="78.177" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="115.599" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="153.027" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="190.449" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="227.871" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<rect x="265.293" y="294.796" style="fill:#76C4BB;" width="12.472" height="12.472"/>				<path style="fill:#76C4BB;" d="M302.715,304.828c5.328-0.911,8.307-1.473,8.307-1.473c-0.23-3.136-0.427-5.958-0.601-8.555h-7.7					v10.027L302.715,304.828L302.715,304.828z"/>			</g>			<g style="opacity:0.25;">				<path style="fill:#24897A;" d="M303.463,253.096c-11.151-37.754-67.121-33.566-91.279-44.408					c-24.157-10.842-20.386-47.219-23.449-53.548h-31.206c0,0-0.719,51.024,23.438,61.866s80.133,6.655,91.279,44.408					c5.857,19.83,5.868,26.552,7.324,47.073c19.234-2.816,31.442-5.126,31.442-5.126					C309.319,280.283,309.612,273.921,303.463,253.096z"/>			</g>			<g>				<g>					<g style="opacity:0.25;">						<polygon style="fill:#24897A;" points="208.946,206.985 175.897,235.7 159.21,207.749 						"/>					</g>					<g style="opacity:0.25;">						<polygon style="fill:#24897A;" points="109.023,207.322 142.606,235.7 159.21,207.749 						"/>					</g>					<path style="fill:#EAEAE1;" d="M159.21,207.749l-38.344-16.637c0,0-3.389,4.817-11.843,16.21l31.723,22.853L159.21,207.749z"/>					<path style="fill:#EAEAE1;" d="M159.21,207.749l37.422-16.637c0,0,3.861,4.48,12.315,15.873l-32.195,23.191L159.21,207.749z"/>					<path style="fill:#E0DBD3;" d="M196.632,191.112l-28.867,12.832c3.26,5.778,7.548,10.516,13.208,13.057						c2.799,1.253,6.02,2.31,9.555,3.249l18.419-13.265C200.493,195.592,196.632,191.112,196.632,191.112z"/>				</g>			</g>			<g>				<g>					<path style="fill:#C65044;" d="M122.833,244.317c0,0-5.784-7.97-5.784-19.925s5.784-19.925,5.784-19.925						c20.403,0,32.066,15.94,32.066,15.94v3.985v3.985C154.899,228.377,143.241,244.317,122.833,244.317z"/>					<path style="fill:#C65044;" d="M195.71,244.317c0,0,5.784-7.97,5.784-19.925s-5.784-19.925-5.784-19.925						c-20.403,0-32.066,15.94-32.066,15.94v3.985v3.985C163.644,228.377,175.301,244.317,195.71,244.317z"/>				</g>				<g>					<path style="fill:#AD3936;" d="M180.714,229.889c-0.32-0.051-0.624-0.141-0.905-0.259l-16.03-4.541l16.643,0.815						c0.298-0.017,0.618-0.006,0.939,0.045c1.591,0.259,2.732,1.355,2.552,2.439S182.305,230.153,180.714,229.889z"/>					<path style="fill:#AD3936;" d="M181.4,222.205c-0.315,0.079-0.63,0.118-0.933,0.124l-16.519,2.186l15.603-5.845						c0.27-0.135,0.562-0.253,0.882-0.332c1.563-0.388,3.046,0.157,3.311,1.225C184.013,220.632,182.962,221.812,181.4,222.205z"/>					<path style="fill:#AD3936;" d="M138.318,229.889c0.32-0.051,0.624-0.141,0.905-0.259l16.03-4.541l-16.643,0.815						c-0.298-0.017-0.618-0.006-0.939,0.045c-1.591,0.259-2.732,1.355-2.552,2.439S136.733,230.153,138.318,229.889z"/>					<path style="fill:#AD3936;" d="M137.632,222.205c0.315,0.079,0.63,0.118,0.933,0.124l16.519,2.186l-15.603-5.845						c-0.27-0.135-0.562-0.253-0.882-0.332c-1.563-0.388-3.046,0.157-3.311,1.225C135.024,220.632,136.075,221.812,137.632,222.205z						"/>				</g>				<path style="fill:#AD3936;" d="M166.561,217.417c0-1.641-0.984-2.99-2.186-2.99h-10.201c-1.203,0-2.186,1.343-2.186,2.99v13.95					c0,1.641,0.984,2.99,2.186,2.99h10.201c1.203,0,2.186-1.343,2.186-2.99V217.417z"/>			</g>			<circle style="fill:#2F3233;" cx="159.21" cy="247.088" r="6.346"/>			<circle style="fill:#2F3233;" cx="159.21" cy="278.856" r="6.346"/>			<circle style="fill:#2F3233;" cx="159.21" cy="310.623" r="6.346"/>		</g>		<g>							<ellipse transform="matrix(-0.177 0.9842 -0.9842 -0.177 384.9922 -85.6602)" style="fill:#DDB58E;" cx="228.311" cy="118.135" rx="21.386" ry="11.629"/>							<ellipse transform="matrix(-0.9842 0.177 -0.177 -0.9842 199.5974 218.4798)" style="fill:#E8C59E;" cx="90.054" cy="118.142" rx="11.629" ry="21.386"/>			<path style="fill:#E8C59E;" d="M223.431,46.943l-63.653,9.218l-65.396-8.33c0,0-5.48,31.83-5.48,46.438				c0,44.184,7.931,104.645,70.303,113.48C259.425,193.557,223.431,46.943,223.431,46.943z"/>			<path style="fill:#DDB58E;" d="M159.21,207.749c100.216-14.192,64.221-160.806,64.221-160.806h-15.024				c4.114,61.242,9.808,93.774-13.815,129.24C175.875,204.287,159.21,207.749,159.21,207.749z"/>			<path style="fill:#DDB58E;" d="M90.059,85.939h5.272c-0.607-9.932-0.073-21.302,4.693-26.068				c9.274-9.274,59.798,8.881,59.798,8.881s51.131-16.328,58.578-8.881c3.912,3.912,4.407,15.726,4.002,26.068h2.282V36.332H90.059				V85.939z"/>			<path style="fill:#393C3D;" d="M238.292,30.042c6.413-12.185,14.698-14.282,14.698-14.282C228.545,2.63,195.968,0,159.21,0				c-49.72,0-68.521,8.869-72.933,30.037c-3.423,16.423-2.012,54.497-0.433,67.149c4.339-0.472,8.611,0.719,11.663,2.102				c0,0-6.756-34.303,2.518-43.582s59.798,8.881,59.798,8.881s51.131-16.328,58.578-8.881s2.518,43.582,2.518,43.582				c3.052-1.383,7.324-2.574,11.663-2.102C235.509,66.599,232.817,40.446,238.292,30.042z"/>			<path style="fill:#393C3D;" d="M150.621,148.654c0,0-13.928,0.511-17.401,16.024c-2.327,10.409-13.669,9.69-18.363,5.548				c-2.209-1.95-2.934-5.177-0.674-7.357c0,0,1.456-1.349,4.148-1.248c1.877,0.067,3.406,1.557,3.406,3.479				s-1.523,3.479-3.406,3.479c-0.332,0-0.646-0.067-0.967-0.141c-0.736-0.174-0.259,0.467,0.017,0.714				c0.388,0.348,0.821,0.646,1.293,0.866c1.085,0.495,2.304,0.545,3.4,0.101c0,0,3.912-1.726,2.636-7.526				c-0.444-2.035-4.187-6.014-9.651-4.896c-0.399,0.079-0.793,0.163-1.186,0.275c-0.939,0.27-1.849,0.646-2.709,1.13				c-1.102,0.618-2.113,1.428-2.917,2.428c-0.961,1.197-1.568,2.647-1.81,4.176c-0.337,2.13,0.006,4.322,0.613,6.368				c0.084,0.287,0.174,0.573,0.27,0.854c0.163,0.483,0.32,0.899,0.579,1.332c0.214,0.365,0.444,0.725,0.686,1.074				c0.793,1.147,1.703,2.209,2.698,3.176c1.383,1.343,2.945,2.496,4.626,3.412c2.108,1.147,4.401,1.911,6.756,2.293				c0.972,0.157,1.962,0.253,2.945,0.287c4.069,0.146,8.875-0.725,14.484-3.333c0,0,13.759-6.081,18.053-16.502				C158.153,164.65,165.763,148.654,150.621,148.654z"/>			<path style="fill:#393C3D;" d="M167.933,148.654c0,0,13.928,0.511,17.401,16.024c2.327,10.409,13.669,9.69,18.363,5.548				c2.209-1.95,2.934-5.177,0.674-7.357c0,0-1.456-1.349-4.148-1.248c-1.877,0.067-3.406,1.557-3.406,3.479s1.523,3.479,3.406,3.479				c0.332,0,0.646-0.067,0.967-0.141c0.736-0.174,0.259,0.467-0.017,0.714c-0.388,0.348-0.821,0.646-1.293,0.866				c-1.085,0.495-2.304,0.545-3.4,0.101c0,0-3.912-1.726-2.636-7.526c0.444-2.035,4.187-6.014,9.651-4.896				c0.399,0.079,0.792,0.163,1.186,0.275c0.939,0.27,1.849,0.646,2.709,1.13c1.102,0.618,2.113,1.428,2.917,2.428				c0.961,1.197,1.568,2.647,1.81,4.176c0.337,2.13-0.006,4.322-0.613,6.368c-0.084,0.287-0.174,0.573-0.27,0.854				c-0.163,0.483-0.32,0.899-0.579,1.332c-0.214,0.365-0.444,0.725-0.686,1.074c-0.792,1.147-1.703,2.209-2.698,3.176				c-1.383,1.343-2.945,2.496-4.626,3.412c-2.108,1.147-4.401,1.911-6.756,2.293c-0.972,0.157-1.962,0.253-2.945,0.287				c-4.069,0.146-8.875-0.725-14.484-3.333c0,0-13.759-6.081-18.053-16.502C160.401,164.65,152.791,148.654,167.933,148.654z"/>		</g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                              `;
                            }

                            return `
                              <svg version="1.1" id="Capa_1" class="Icon-image"
                                style="
                                  width:16px;
                                  height:16px;
                                "
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 318.975 318.975" style="enable-background:new 0 0 318.975 318.975;" xml:space="preserve"><g>	<g>		<path style="fill:#E8C59E;" d="M303.678,253.528c-11.151-37.754-67.121-33.566-91.279-44.408			c-24.157-10.842-20.386-47.219-23.449-53.548h-58.932c-3.058,6.329,0.714,42.711-23.449,53.548			c-24.157,10.842-80.133,6.655-91.279,44.408c-6.149,20.824-5.857,27.193-7.554,50.26c0,0,76.8,15.187,150.014,15.187			s153.488-15.187,153.488-15.187C309.536,280.715,309.828,274.352,303.678,253.528z"/>		<path style="fill:#DDB58E;" d="M303.678,253.528c-11.151-37.754-67.121-33.566-91.279-44.408			c-24.157-10.842-20.386-47.219-23.449-53.548h-31.206c0,0-0.719,51.024,23.438,61.866s80.133,6.655,91.279,44.408			c5.857,19.83,5.868,26.552,7.324,47.073c19.234-2.816,31.442-5.126,31.442-5.126C309.536,280.715,309.828,274.352,303.678,253.528			z"/>		<path style="fill:#CCA281;" d="M122.088,193.168c9.78,7.959,21.24,15.85,37.338,18.132c16.137-2.288,27.569-10.342,37.36-18.334			c-8.144-14.973-5.626-32.83-7.83-37.4h-58.938C127.804,160.142,130.272,178.189,122.088,193.168z"/>					<ellipse transform="matrix(-0.177 0.9842 -0.9842 -0.177 385.6717 -85.3651)" style="fill:#DDB58E;" cx="228.527" cy="118.567" rx="21.386" ry="11.629"/>					<ellipse transform="matrix(-0.9842 0.177 -0.177 -0.9842 200.1008 219.2995)" style="fill:#E8C59E;" cx="90.269" cy="118.575" rx="11.629" ry="21.386"/>		<path style="fill:#E8C59E;" d="M223.647,47.375l-64.221-30.16l-64.187,30.16c0,0-35.989,146.614,64.187,160.806			C259.641,193.989,223.647,47.375,223.647,47.375z"/>		<path style="fill:#DDB58E;" d="M159.426,208.181c100.216-14.192,64.221-160.806,64.221-160.806h-15.024			c4.114,61.242,9.808,93.774-13.815,129.24C176.091,204.719,159.426,208.181,159.426,208.181z"/>		<path style="fill:#DDB58E;" d="M102.332,89.215c0,0,41.744,27.429,114.936,17.868V89.215H102.332z"/>		<path style="fill:#F2AC2F;" d="M151.164,101.878c33.358,5.008,65.165-0.18,65.165-0.18c2.585,6.762,3.586,28.069,3.861,38.018			l6.441-0.045c3.041-10.156,6.863-43.178,6.863-43.178c16.525-9.538,27.726-24.759,30.127-38.743c0,0-8.504,4.699-22.218-2.9			c13.242-10.713,10.05-28.215,10.05-28.215s-13.669,7.059-20.897,5.014c0,0,6.7-5.059,5.632-18.452c0,0-8.656,8.656-16.62,7.065			c0,0,6.823-5.238,0.899-15.035c0,0-10.022,7.745-23.297,5.632c0,0,6.334-2.9,6.334-10.859c0,0-17.205,11.393-40.896,7.728			c-22.095-3.417-37.113,4.373-48.86,16.339c0,0-9.864-1.585-19.2,7.655s-8.892,9.24-14.709,10.134c0,0,1.102,9.049,6.458,10.308			c0,0-1.759,7.599-8.92,8.268c0,0,1.681,17.907,7.779,18.582c0,0-1.163,8.909-6.936,11.438c0,0,1.709,10.752,9.055,17.907			l4.991,31.346h7.133c-0.697-27.923,2.94-50.507,2.94-50.507S121.431,97.421,151.164,101.878z"/>		<path style="fill:#E59A23;" d="M226.013,59.325c8.841,0.45,15.389-4.468,15.389-4.468c0.95,0.528,1.872,0.989,2.765,1.4l0,0			C235.456,62.264,226.013,59.325,226.013,59.325z"/>		<path style="fill:#E59A23;" d="M217.268,35.712c8.38,0.781,13.287-4.052,13.287-4.052c1.175,0.332,2.518,0.422,3.946,0.343l0,0			C229.105,38.922,217.268,35.712,217.268,35.712z"/>		<path style="fill:#E59A23;" d="M208.55,22.392c5.598,1.343,11.016-2.125,11.016-2.125c1.518,0.304,3.058,0.236,4.558-0.073			c0,0.045-0.017,0.073-0.017,0.073C218.066,25.865,208.55,22.392,208.55,22.392z"/>		<path style="fill:#E59A23;" d="M187.731,12.763c4.586,0.225,9.437-1.9,9.437-1.9c1.489,0.236,2.934,0.343,4.333,0.36l0,0			C194.004,14.495,187.731,12.763,187.731,12.763z"/>		<path style="fill:#EAE5DC;" d="M86.538,214.757c-8.043,1.624-16.884,3.119-25.557,5.21c1.09,11.489,5.143,58.404,2.226,92.442			c27.221,3.423,61.253,6.565,94.544,6.565c34.022,0,69.566-3.282,97.872-6.79c-2.878-34.044,1.169-80.83,2.248-92.246			c-8.678-2.085-17.519-3.58-25.551-5.205c-16.069,56.245-58.404,55.683-72.894,55.683			C144.936,270.418,102.613,270.98,86.538,214.757z"/>		<path style="fill:#E0DBD3;" d="M227.435,228.443c10.454,2.557,20.628,6.008,28.817,11.607c0.624-9.257,1.27-16.48,1.619-20.116			c-8.678-2.085-17.519-3.58-25.551-5.205C230.886,219.743,229.245,224.295,227.435,228.443z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            `;
                          })()}
                        </fl-icon>
                        <span style="margin-left: 5px; text-transform: capitalize;">
                          ${el.owner_info.role}
                        </span>
                      </div>
                      <div class="info-card-details info-card-grid-item info-card-skillsContainer">
                        <span class="Icon Icon--small info-card--iconSpace" title="Skills"
                          i18n-title-id="aa79c5d1cbe3d96218a92481bcfaa39c" i18n-title-msg="Skills" i18n-id="">
                          <fl-icon name="ui-tag"><svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                              <path
                                d="M23.648 13.551l-13.2-13.2A1.197 1.197 0 0 0 9.6 0H1.2C.536 0 0 .536 0 1.2v8.4c0 .32.126.623.352.848l13.2 13.2a1.197 1.197 0 0 0 1.696 0l8.4-8.4c.47-.469.47-1.227 0-1.697zM6 8.4a2.4 2.4 0 1 1-.001-4.8 2.4 2.4 0 0 1 0 4.799z"
                                fill="#363F4D"></path>
                            </svg></fl-icon>
                        </span>
                        <div class="info-card-skills">
                          ${el.jobs.map(function(job){
                            return `
                              <span>${job.name}</span>
                            `;
                          }).join('')}
                        </div>
                      </div>
                    </div>
                    <div class="info-card-tags">
                      <fl-upgrade-tags upgrades="ProjectTile.project.upgrades" type="'project'" max-tags="3">
                        <ul class="UpgradeTag">
                        </ul>
                      </fl-upgrade-tags>
                    </div>
                  </div>
          
                  <div class="info-card-action" ng-if="ProjectTile.project.currency.code !== 'TKN'">
                    <div class="info-card-price" ng-if="ProjectTile.project.price">
                      <span ng-if="ProjectTile.project.price.range">
                        $${Math.round(el.budget.minimum * el.currency.exchange_rate)} -
                        $${typeof el.budget.maximum !== 'undefined' ? Math.round(el.budget.maximum * el.currency.exchange_rate) : 'False'}
                      </span>
                    </div>
                    <div class="info-card-price-type">
                      <span i18n-id="718e01467010e10a3d656443dae6e088" i18n-msg="USD [1: per hour ]">
                        USD ${el.type === 'hourly' ? 'per hour' : ''}
                      </span>
                    </div>
                  </div>
                </fl-project-tile>
              </div>
            </a>
          </li>
        `;
      }).join(' ');

      container.append(newContent);
    })
    .catch(function(err){
      console.error(err);
    });
  });
});

const countries = [
  {"name": "Afghanistan", "code": "AF"}, 
  {"name": "land Islands", "code": "AX"}, 
  {"name": "Albania", "code": "AL"}, 
  {"name": "Algeria", "code": "DZ"}, 
  {"name": "American Samoa", "code": "AS"}, 
  {"name": "AndorrA", "code": "AD"}, 
  {"name": "Angola", "code": "AO"}, 
  {"name": "Anguilla", "code": "AI"}, 
  {"name": "Antarctica", "code": "AQ"}, 
  {"name": "Antigua and Barbuda", "code": "AG"}, 
  {"name": "Argentina", "code": "AR"}, 
  {"name": "Armenia", "code": "AM"}, 
  {"name": "Aruba", "code": "AW"}, 
  {"name": "Australia", "code": "AU"}, 
  {"name": "Austria", "code": "AT"}, 
  {"name": "Azerbaijan", "code": "AZ"}, 
  {"name": "Bahamas", "code": "BS"}, 
  {"name": "Bahrain", "code": "BH"}, 
  {"name": "Bangladesh", "code": "BD"}, 
  {"name": "Barbados", "code": "BB"}, 
  {"name": "Belarus", "code": "BY"}, 
  {"name": "Belgium", "code": "BE"}, 
  {"name": "Belize", "code": "BZ"}, 
  {"name": "Benin", "code": "BJ"}, 
  {"name": "Bermuda", "code": "BM"}, 
  {"name": "Bhutan", "code": "BT"}, 
  {"name": "Bolivia", "code": "BO"}, 
  {"name": "Bosnia and Herzegovina", "code": "BA"}, 
  {"name": "Botswana", "code": "BW"}, 
  {"name": "Bouvet Island", "code": "BV"}, 
  {"name": "Brazil", "code": "BR"}, 
  {"name": "British Indian Ocean Territory", "code": "IO"}, 
  {"name": "Brunei Darussalam", "code": "BN"}, 
  {"name": "Bulgaria", "code": "BG"}, 
  {"name": "Burkina Faso", "code": "BF"}, 
  {"name": "Burundi", "code": "BI"}, 
  {"name": "Cambodia", "code": "KH"}, 
  {"name": "Cameroon", "code": "CM"}, 
  {"name": "Canada", "code": "CA"}, 
  {"name": "Cape Verde", "code": "CV"}, 
  {"name": "Cayman Islands", "code": "KY"}, 
  {"name": "Central African Republic", "code": "CF"}, 
  {"name": "Chad", "code": "TD"}, 
  {"name": "Chile", "code": "CL"}, 
  {"name": "China", "code": "CN"}, 
  {"name": "Christmas Island", "code": "CX"}, 
  {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
  {"name": "Colombia", "code": "CO"}, 
  {"name": "Comoros", "code": "KM"}, 
  {"name": "Congo", "code": "CG"}, 
  {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
  {"name": "Cook Islands", "code": "CK"}, 
  {"name": "Costa Rica", "code": "CR"}, 
  {"name": "Cote D'Ivoire", "code": "CI"}, 
  {"name": "Croatia", "code": "HR"}, 
  {"name": "Cuba", "code": "CU"}, 
  {"name": "Cyprus", "code": "CY"}, 
  {"name": "Czech Republic", "code": "CZ"}, 
  {"name": "Denmark", "code": "DK"}, 
  {"name": "Djibouti", "code": "DJ"}, 
  {"name": "Dominica", "code": "DM"}, 
  {"name": "Dominican Republic", "code": "DO"}, 
  {"name": "Ecuador", "code": "EC"}, 
  {"name": "Egypt", "code": "EG"}, 
  {"name": "El Salvador", "code": "SV"}, 
  {"name": "Equatorial Guinea", "code": "GQ"}, 
  {"name": "Eritrea", "code": "ER"}, 
  {"name": "Estonia", "code": "EE"}, 
  {"name": "Ethiopia", "code": "ET"}, 
  {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
  {"name": "Faroe Islands", "code": "FO"}, 
  {"name": "Fiji", "code": "FJ"}, 
  {"name": "Finland", "code": "FI"}, 
  {"name": "France", "code": "FR"}, 
  {"name": "French Guiana", "code": "GF"}, 
  {"name": "French Polynesia", "code": "PF"}, 
  {"name": "French Southern Territories", "code": "TF"}, 
  {"name": "Gabon", "code": "GA"}, 
  {"name": "Gambia", "code": "GM"}, 
  {"name": "Georgia", "code": "GE"}, 
  {"name": "Germany", "code": "DE"}, 
  {"name": "Ghana", "code": "GH"}, 
  {"name": "Gibraltar", "code": "GI"}, 
  {"name": "Greece", "code": "GR"}, 
  {"name": "Greenland", "code": "GL"}, 
  {"name": "Grenada", "code": "GD"}, 
  {"name": "Guadeloupe", "code": "GP"}, 
  {"name": "Guam", "code": "GU"}, 
  {"name": "Guatemala", "code": "GT"}, 
  {"name": "Guernsey", "code": "GG"}, 
  {"name": "Guinea", "code": "GN"}, 
  {"name": "Guinea-Bissau", "code": "GW"}, 
  {"name": "Guyana", "code": "GY"}, 
  {"name": "Haiti", "code": "HT"}, 
  {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
  {"name": "Holy See (Vatican City State)", "code": "VA"}, 
  {"name": "Honduras", "code": "HN"}, 
  {"name": "Hong Kong", "code": "HK"}, 
  {"name": "Hungary", "code": "HU"}, 
  {"name": "Iceland", "code": "IS"}, 
  {"name": "India", "code": "IN"}, 
  {"name": "Indonesia", "code": "ID"}, 
  {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
  {"name": "Iraq", "code": "IQ"}, 
  {"name": "Ireland", "code": "IE"}, 
  {"name": "Isle of Man", "code": "IM"}, 
  {"name": "Israel", "code": "IL"}, 
  {"name": "Italy", "code": "IT"}, 
  {"name": "Jamaica", "code": "JM"}, 
  {"name": "Japan", "code": "JP"}, 
  {"name": "Jersey", "code": "JE"}, 
  {"name": "Jordan", "code": "JO"}, 
  {"name": "Kazakhstan", "code": "KZ"}, 
  {"name": "Kenya", "code": "KE"}, 
  {"name": "Kiribati", "code": "KI"}, 
  {"name": "Korea, Democratic People'S Republic of", "code": "KP"}, 
  {"name": "Korea, Republic of", "code": "KR"}, 
  {"name": "Kuwait", "code": "KW"}, 
  {"name": "Kyrgyzstan", "code": "KG"}, 
  {"name": "Lao People'S Democratic Republic", "code": "LA"}, 
  {"name": "Latvia", "code": "LV"}, 
  {"name": "Lebanon", "code": "LB"}, 
  {"name": "Lesotho", "code": "LS"}, 
  {"name": "Liberia", "code": "LR"}, 
  {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
  {"name": "Liechtenstein", "code": "LI"}, 
  {"name": "Lithuania", "code": "LT"}, 
  {"name": "Luxembourg", "code": "LU"}, 
  {"name": "Macao", "code": "MO"}, 
  {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
  {"name": "Madagascar", "code": "MG"}, 
  {"name": "Malawi", "code": "MW"}, 
  {"name": "Malaysia", "code": "MY"}, 
  {"name": "Maldives", "code": "MV"}, 
  {"name": "Mali", "code": "ML"}, 
  {"name": "Malta", "code": "MT"}, 
  {"name": "Marshall Islands", "code": "MH"}, 
  {"name": "Martinique", "code": "MQ"}, 
  {"name": "Mauritania", "code": "MR"}, 
  {"name": "Mauritius", "code": "MU"}, 
  {"name": "Mayotte", "code": "YT"}, 
  {"name": "Mexico", "code": "MX"}, 
  {"name": "Micronesia, Federated States of", "code": "FM"}, 
  {"name": "Moldova, Republic of", "code": "MD"}, 
  {"name": "Monaco", "code": "MC"}, 
  {"name": "Mongolia", "code": "MN"}, 
  {"name": "Montenegro", "code": "ME"},
  {"name": "Montserrat", "code": "MS"},
  {"name": "Morocco", "code": "MA"}, 
  {"name": "Mozambique", "code": "MZ"}, 
  {"name": "Myanmar", "code": "MM"}, 
  {"name": "Namibia", "code": "NA"}, 
  {"name": "Nauru", "code": "NR"}, 
  {"name": "Nepal", "code": "NP"}, 
  {"name": "Netherlands", "code": "NL"}, 
  {"name": "Netherlands Antilles", "code": "AN"}, 
  {"name": "New Caledonia", "code": "NC"}, 
  {"name": "New Zealand", "code": "NZ"}, 
  {"name": "Nicaragua", "code": "NI"}, 
  {"name": "Niger", "code": "NE"}, 
  {"name": "Nigeria", "code": "NG"}, 
  {"name": "Niue", "code": "NU"}, 
  {"name": "Norfolk Island", "code": "NF"}, 
  {"name": "Northern Mariana Islands", "code": "MP"}, 
  {"name": "Norway", "code": "NO"}, 
  {"name": "Oman", "code": "OM"}, 
  {"name": "Pakistan", "code": "PK"}, 
  {"name": "Palau", "code": "PW"}, 
  {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
  {"name": "Panama", "code": "PA"}, 
  {"name": "Papua New Guinea", "code": "PG"}, 
  {"name": "Paraguay", "code": "PY"}, 
  {"name": "Peru", "code": "PE"}, 
  {"name": "Philippines", "code": "PH"}, 
  {"name": "Pitcairn", "code": "PN"}, 
  {"name": "Poland", "code": "PL"}, 
  {"name": "Portugal", "code": "PT"}, 
  {"name": "Puerto Rico", "code": "PR"}, 
  {"name": "Qatar", "code": "QA"}, 
  {"name": "Reunion", "code": "RE"}, 
  {"name": "Romania", "code": "RO"}, 
  {"name": "Russian Federation", "code": "RU"}, 
  {"name": "RWANDA", "code": "RW"}, 
  {"name": "Saint Helena", "code": "SH"}, 
  {"name": "Saint Kitts and Nevis", "code": "KN"}, 
  {"name": "Saint Lucia", "code": "LC"}, 
  {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
  {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
  {"name": "Samoa", "code": "WS"}, 
  {"name": "San Marino", "code": "SM"}, 
  {"name": "Sao Tome and Principe", "code": "ST"}, 
  {"name": "Saudi Arabia", "code": "SA"}, 
  {"name": "Senegal", "code": "SN"}, 
  {"name": "Serbia", "code": "RS"}, 
  {"name": "Seychelles", "code": "SC"}, 
  {"name": "Sierra Leone", "code": "SL"}, 
  {"name": "Singapore", "code": "SG"}, 
  {"name": "Slovakia", "code": "SK"}, 
  {"name": "Slovenia", "code": "SI"}, 
  {"name": "Solomon Islands", "code": "SB"}, 
  {"name": "Somalia", "code": "SO"}, 
  {"name": "South Africa", "code": "ZA"}, 
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
  {"name": "Spain", "code": "ES"}, 
  {"name": "Sri Lanka", "code": "LK"}, 
  {"name": "Sudan", "code": "SD"}, 
  {"name": "Suriname", "code": "SR"}, 
  {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
  {"name": "Swaziland", "code": "SZ"}, 
  {"name": "Sweden", "code": "SE"}, 
  {"name": "Switzerland", "code": "CH"}, 
  {"name": "Syrian Arab Republic", "code": "SY"}, 
  {"name": "Taiwan, Province of China", "code": "TW"}, 
  {"name": "Tajikistan", "code": "TJ"}, 
  {"name": "Tanzania, United Republic of", "code": "TZ"}, 
  {"name": "Thailand", "code": "TH"}, 
  {"name": "Timor-Leste", "code": "TL"}, 
  {"name": "Togo", "code": "TG"}, 
  {"name": "Tokelau", "code": "TK"}, 
  {"name": "Tonga", "code": "TO"}, 
  {"name": "Trinidad and Tobago", "code": "TT"}, 
  {"name": "Tunisia", "code": "TN"}, 
  {"name": "Turkey", "code": "TR"}, 
  {"name": "Turkmenistan", "code": "TM"}, 
  {"name": "Turks and Caicos Islands", "code": "TC"}, 
  {"name": "Tuvalu", "code": "TV"}, 
  {"name": "Uganda", "code": "UG"}, 
  {"name": "Ukraine", "code": "UA"}, 
  {"name": "United Arab Emirates", "code": "AE"}, 
  {"name": "United Kingdom", "code": "GB"}, 
  {"name": "United States", "code": "US"}, 
  {"name": "United States Minor Outlying Islands", "code": "UM"}, 
  {"name": "Uruguay", "code": "UY"}, 
  {"name": "Uzbekistan", "code": "UZ"}, 
  {"name": "Vanuatu", "code": "VU"}, 
  {"name": "Venezuela", "code": "VE"}, 
  {"name": "Viet Nam", "code": "VN"}, 
  {"name": "Virgin Islands, British", "code": "VG"}, 
  {"name": "Virgin Islands, U.S.", "code": "VI"}, 
  {"name": "Wallis and Futuna", "code": "WF"}, 
  {"name": "Western Sahara", "code": "EH"}, 
  {"name": "Yemen", "code": "YE"}, 
  {"name": "Zambia", "code": "ZM"}, 
  {"name": "Zimbabwe", "code": "ZW"} 
];