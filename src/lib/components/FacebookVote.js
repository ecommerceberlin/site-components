import React from 'react'
import fetch from 'isomorphic-unfetch';
import Facebook from '../services/Facebook';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import translate from '../i18n/translate'

import {
  dialogShow
} from './redux/actions';


const styles = {



}


class FacebookVote extends React.Component {


    handleVoteClick = () => {

        const {auth, dialogShow, appId} = this.props;


        //check if authenticated...

        dialogShow({
            title: "Please login...",
            content: <Facebook button={true} appId={appId} />,
            buttons: []
        });

    }


    saveVote(){

        const {id} = this.props;

        fetch(props.api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fields: payload,
              tickets: { [props.ticketId]: 1 },
              template : props.template
            })
          })
            .then(response => {
              if (response.status !== 200) {

              }
              return response.json();
            })
            .then(data => {
             
        });

    }


    render(){
        return (

            <Button
            variant="outlined"
            onClick={() => this.handleVoteClick()}
            color="primary"
          >
            {translate('common.vote_with_facebook')}
          </Button>
        )
    }


}

FacebookVote.propTypes = {
    id: PropTypes.number.isRequired,
    appId : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired
  };

FacebookVote.defaultProps = {
    name : "default"
}

const enhance = compose(
    translate,
    withStyles(styles),
    connect(
      (state, props) => ({auth : state.social.facebook}),
      {dialogShow}
    )
);


export default enhance(FacebookVote)




/*




if(typeof(WIDGETS)=="undefined")
{
	var WIDGETS = new Object();
}

WIDGETS[<?php echo $data["uniqid"]; ?>] = {
	
	
	fbid			: 0,
	fbsess 			: {},
	fbprofile 		: {},
	
	votes 			: [],
	votings_loaded 	: 0,
	selection		: 0,
	
	data 			: <?php echo my_json_encode($data); ?>,
	
	msgs			: {		
					votable 		: "zagłosuj teraz",
					voted			: "już zagłosowałeś",
					blocked		 	: "głosowanie nieaktywne",
					limit_exceeded 	: "przekroczyłeś limit głosów",
					abandoned		: "musisz opublikować wiadomość na wallu aby oddać głos",
					share			: "czy chcesz pomóc w promocji Ekomersów i udostępnić informację na portalu Facebook? (masz wpływ na jej treść)"
					},
	
	defaults 		: {	
					max_votes		: 10,
					skipfacebook 	: 0
					},
	
	fbtemplate 		: {
						method		: 'share',
						href 		: "http://<?php echo HOST; ?>",
						hashtag		: "",
						quote		: "",
						ref			: "",
						mobile_iframe: true

					},
	
	init : function()
	{
		var obj = this;
		this.msgs = jQuery.extend(obj.msgs, obj.data.msgs);
		this.data = jQuery.extend(true, obj.defaults, obj.data);
	},
	
	plugin_url : function()
	{
		return "/api/plugin/<?php echo $data["uniqid"]; ?>";
	},
	
	update_fbvars : function(authResponse)
	{
		if(typeof(authResponse)!="undefined" && authResponse.userID)
		{
			this.fbsess = authResponse;
			this.fbid 	= authResponse.userID;
		}
	
	},
	
	update_counter : function()
	{
		var obj = this;
		
		jQuery("#counter span").html(obj.data.max_votes - obj.votes.length);	 
	},
						
	block : function(id)
	{	
		var obj = this;
		
		var row 	= jQuery("#p-" + id);
		var button 	= jQuery(".fbvote", row);
		
		if(row.is("tr"))
		{
			row.css({border : "2px solid #666"});
		}
		
		button.html(obj.data.msgs.voted).unbind("click").bind("click",function(e)
		{	
			var ref = jQuery(this);
			e.preventDefault();
		}).attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-success");
	},
	
	get_template : function()
	{
		var obj = this;
		
		var items = obj.data.items;
		var pick =	items[Math.floor(Math.random()*items.length)];
		return jQuery.extend({}, obj.fbtemplate, pick);
	},
	
	mark_votings : function()
	{
		var obj = this;
		
		jQuery.each(obj.votes, function(i, v)
		{
			obj.block(v);
		});
		
		obj.update_counter();
	},
	 
	get_votings : function(reload, callback)
	{
		var obj = this;
		
		var reload = reload || false;
		var callback = callback || function(){};
		
		if(!obj.votings_loaded || reload)
		{
			jQuery.post(obj.plugin_url(), {fbid : obj.fbid}, function(data)
			{
				obj.votings_loaded = 1;
				obj.votes = typeof(data.votes) != "undefined" ? data.votes : [];
				obj.mark_votings();
				
				callback();

			});
		}
	},
	
	can_vote : function(throwalerts){

		var obj = this;
		
		var throwalerts = throwalerts || false;

		if(!obj.votings_loaded)
		{ 
			return true;
		}

		//we might be before selection
		//so we should check global limit

		var max_votes = parseInt(obj.data.max_votes);

		if(obj.votes.length >= max_votes)
		{
			if(throwalerts) alert(obj.data.msgs.limit_exceeded);
			return false;
		}

		if(obj.selection && (jQuery.inArray(obj.selection, obj.votes) > -1))
		{		
			if(throwalerts) alert(obj.data.msgs.voted);
			return false;			
		}
	
		return true; //can vote
	},
	
	proceed_with_voting : function()
	{	
		var obj 	= this;
		
		if(!obj.can_vote(true))
		{
			return;
		};

		if(obj.data.skipfacebook)
		{


			FB.api('/me', {"fields":"email,verified,gender,link,name,birthday,location"}, function(profile)
			{
				obj.fbprofile = profile; 
				
				obj.save_vote();
			
			});

		}
		else
		{

			FB.api('/me', {"fields":"email,verified,gender,link,name,birthday,location"}, function(profile)
			{
			obj.fbprofile = profile; 
			
			var template = obj.get_template();
			
			//console.log(template);

			obj.save_vote();
						
			if(obj.votes.length === 0)
			{
			
				if(window.confirm(obj.data.msgs.share))
				{
					FB.ui( template, function(response){} );
				}
				
			}

			
		
			});
		}
	},
	
	save_vote : function(fbpost_id)
	{

		var fbpost_id = fbpost_id || 0;

		var obj = this;
		
		jQuery.ajax({

			type 		: "POST",
			url 		: obj.plugin_url(),
			async 		: true,
			cache 		: false,
			data 		: {
				fbid : obj.fbid, 
				fbsess: obj.fbsess, 
				fbprofile : obj.fbprofile, 
				participant_id : obj.selection, 
				fbpost_id : fbpost_id},
			dataType 	: 'json',
			success 	: function(response)
			{
				if(response.operation)
				{	
					obj.votes.push(obj.selection);
					
					//vote save, block selection!						
					obj.block(obj.selection);	

					<?php if(getval($data, "callback_post_vote")): ?>


						<?php echo getval($data, "callback_post_vote"); ?>



					<?php endif; ?>


					

				}
				else
				{
					obj.get_votings(true);
					alert(response.message);
				}

				
			}
		});

		


	},
	


	
	run : function(ref)
	{
		
		var obj 		= this;		
		var ref 		= jQuery(ref);	
		
		obj.selection 	= parseInt(ref.attr("id").split("-")[1]);	

		if(! obj.fbid > 0)
		{
			//console.log("not logged");
								
			FB.login(function(response)
			{
			    if(response.authResponse)
				{					
					obj.update_fbvars(response.authResponse);
			
					obj.get_votings(false, function()
					{	
						obj.proceed_with_voting();
					});					
			    }
				else
				{
			    	alert("Please login / Musisz się zalogować!");
			    }

			},
			{scope:'public_profile,email,user_friends'}
			);
		}
		else
		{	
			 
			obj.proceed_with_voting();
		}		
	}
}


WIDGETS[<?php echo $data["uniqid"]; ?>].init();

jQuery(document).bind("fbInit", function()
{



	FB.getLoginStatus(function(response)
	{			
		if(response && response.authResponse)
		{		
					
			WIDGETS[<?php echo $data["uniqid"]; ?>].update_fbvars(response.authResponse); 
			
			//READ VOTES!
			WIDGETS[<?php echo $data["uniqid"]; ?>].get_votings();
		
		}
	});
	
});




*/