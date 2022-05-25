
	$(document).ready(function () {

		//a링크해제
		$("a").click(function (e) {
			e.preventDefault();
		});


		//.sec 높이 지정
		var h = $(window).height();
		$(".sec").height(h);
		$("#pop").height(h);

		//윈도우 크기 변경시 .sec 높이 재지정
		$(window).resize(function () {
			h = $(window).height();
			$(".sec").height(h);
			$("#pop").height(h);
		});



		//nav 클릭시 화면 이동
		$("nav ul li").click(function () {
			h = $(window).height();
			var nav_index = $(this).index();
			var move = h * nav_index;
			$("html, body").stop().animate({ scrollTop: move }, 300);
		});



		//mousewheel
		$(".sec").on("mousewheel", function (event, delta) {
			//마우스 휠을 올렸을때	
			if (delta > 0) {
				var prev = $(this).prev().offset().top;
				$("html,body").stop().animate({ "scrollTop": prev }, 200);
				//마우스 휠을 내렸을때	 
			} else if (delta < 0) {
				var next = $(this).next().offset().top;
				$("html,body").stop().animate({ "scrollTop": next }, 200);
			}
		});



		//스크롤 버튼 클릭시 한단 내려감
		$("header p").click(function () {
			h = $(window).height();
			$("html").stop().animate({ scrollTop: h }, 300);
		});


		//스크롤 이벤트
		$(window).scroll(function () {
			h = $(window).height();
			var top = $(window).scrollTop();

			//스크롤시 nav 모양 변경
			for (var i = 0; i < 6; i++) {
				if (top >= h * i && top < h * (i + 1)) {
					$("nav ul li").removeClass("on");
					$("nav ul li").eq(i).addClass("on");
				}
			}

			//스크롤시 최상단에서 nav 숨김/표시
			if (top >= h) {
				$("nav").css({ display: "block" });
				$("nav li").stop().animate({ marginTop: "0" }, 200, "easeOutExpo");
			} else {
				$("nav").css({ display: "none" });
				$("nav li").css({ marginTop: "-100px" });
			}

			//스크롤시 동영상 멈춤
			trail.pause();
			$("#about_show").show();
			$("#about_black").stop().animate({ opacity: "1" }, 300);
			$("#about_show> img").stop().animate({ opacity: "1" }, 300, function () {
				$("#about_txt").stop().animate({ left: "50%", opacity: "1" }, 300);
				$("#about_play").show();
			});

			//스크롤시 아일랜드 팝업창 없어짐
			$("#pop").hide();
			$(".pop").hide();
			$(".album").css({ left: "40%", opacity: "0" }, 300);

		});
		

		//about 화면 클릭시 동영상 재생, 다시 클릭시 멈춤
		var trail = $("#about video").get(0);

		$("#about_play").click(function () {
			$("#about_play").hide();
			$("#about_txt").stop().animate({ left: "45%", opacity: "0" }, 300, function () {
				$("#about_show> img").stop().animate({ opacity: "0" }, 300);
				$("#about_black").stop().animate({ opacity: "0" }, 300, function () {
					$("#about_show").hide();
					trail.play();
				});
			});
		});

		$("#about video").click(function () {
			trail.pause();
			$("#about_show").show();
			$("#about_black").stop().animate({ opacity: "1" }, 300);
			$("#about_show> img").stop().animate({ opacity: "1" }, 300, function () {
				$("#about_txt").stop().animate({ left: "50%", opacity: "1" }, 300);
				$("#about_play").show();
			});
			
		});



		//char 선택시 변경
		$("#char_btn li").click(function () {
			//버튼
			$("#char_btn li").removeClass("on");
			$(this).addClass("on");
			
			var ii = $(this).index();
			
			$(".char img:first-child").stop().animate({ top: "30%", opacity: 0 }, 200);
			$(".char img:nth-child(2)").stop().delay(100).animate({ top: "15%", opacity: 0 }, 200);
			$(".char img:nth-child(3)").stop().delay(150).animate({ top: "40%", opacity: 0 }, 200);
			$(".char p").stop().delay(200).animate({ top: "40%", opacity: 0 }, 200, function () {
				$(".char").removeClass("on");
				$(".char").eq(ii).addClass("on");
				$(".char img:first-child").stop().animate({ top: "15%", opacity: 1 }, 300);
				$(".char img:nth-child(2)").stop().delay(100).animate({ top: "5%", opacity: 1 }, 200);
				$(".char img:nth-child(3)").stop().delay(150).animate({ top: "30%", opacity: 1 }, 200);
				$(".char p").stop().delay(200).animate({ top: "30%", opacity: 1 }, 200);
			});
			
			
		});


		//char 선택시 배경 변경
		$("#char_btn li").eq(0).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#ffcb4e" }, 500 );
		});
		$("#char_btn li").eq(1).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#5583ca" }, 500);
		});
		$("#char_btn li").eq(2).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#834fa4" }, 500);
		});
		$("#char_btn li").eq(3).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#5aa235" }, 500);
		});
		$("#char_btn li").eq(4).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#dd1a00" }, 500);
		});
		$("#char_btn li").eq(5).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#ef88c7" }, 500);
		});
		$("#char_btn li").eq(6).click(function () {
			$("#char").stop().delay(100).animate({ backgroundColor: "#cacc4b" },500);
		});


		//island 팝업창 열고닫기
		$("#island_btn p").click(function () {
			var is = $(this).index();
			$("#pop").show();
			$(".pop").eq(is).show();

			$(".album").stop().animate({ left: "50%", opacity: "1" }, 500);
		});

		$("#pop_close").click(function () {
			$("#pop").hide();
			$(".pop").hide();

			$(".album").css({ left: "40%", opacity: "0" }, 300);
		});



		//갤러리 슬라이드
		var gall = 0;
		$("#gall_btn img").eq(1).click(function () {
			var len = $("#gall_wrap p").length;
			if (gall < len-4) {
				gall++;
				var gallmove = -250 * gall;
				$("#gall_wrap").stop().animate({ marginLeft: gallmove }, 300);
			} else {
				false;
			}
		});

		$("#gall_btn img").eq(0).click(function () {
			var len = $("#gall_wrap p").length;
			if (gall > 0) {
				gall--;
				var gallmove = -250 * gall;
				$("#gall_wrap").stop().animate({ marginLeft: gallmove }, 300);
			} else {
				false;
			}
		});


		//썸네일 클릭시 화면 보이기
		$("#gall_wrap p").click(function () {
			var thum = $(this).index();
			$("#gall_img img").removeClass("on");
			$("#gall_img img").eq(thum).addClass("on");
		});



		//others 버튼 클릭 표시
		$("#etc_btn p").click(function () {
			$("#etc_btn p").removeClass("on");
			$(this).addClass("on");

			var etci = $(this).index();
			
			$(".con_txt").stop().animate({ marginLeft: "-750px", opacity: "0" }, 200, function () {
				$(".con img").stop().animate({ opacity: "0.4" }, 100, function () {
					$(".con").removeClass("on");
					$(".con").eq(etci).addClass("on");
					$(".con_txt").stop().animate({ marginLeft: "-620px", opacity: "1" }, 200);
					$(".con img").stop().animate({ opacity: "1" }, 100);
				});
			});
		});



		//동영상 연결 변경
		$("#etc_btn p").eq(0).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/_EAxUq_Ilf8" });
		});
		$("#etc_btn p").eq(1).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/XBmmcSq2K9A" });
		});
		$("#etc_btn p").eq(2).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/zON6Mu9_PC0" });
		});
		$("#etc_btn p").eq(3).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/ul7wcneBjOI" });
		});
		$("#etc_btn p").eq(4).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/4vVQtlrtkBo" });
		});
		$("#etc_btn p").eq(5).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/Cmmux9XUKJo" });
		});
		$("#etc_btn p").eq(6).click(function () {
			$("#youtube iframe").attr({ src: "https://www.youtube.com/embed/hkta4xYaj1k" });
		});

	});